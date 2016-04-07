const bodyParser = require("body-parser")
const compression = require("compression")
const connect = require("connect")
const Cookies = require("cookies")
const http = require("http")
const st = require("st")
const Url = require("url")

function handleBuildFiles(project) {
	var globalFileHandler = st({
		path: ".",
		index: false,
		dot: true,
		passthrough: true,
		cache: false,
	})

	var routes = {}

	for (var partName in project.output) {
		var url = project.output[partName]
		var path = project.builds[partName]

		if (url && path) {
			routes[url] = "/" + path
		}
	}

	return (req, res, next) => {
		var path = routes[req.url]

		if (!path) {
			next()
			return
		}

		var originalUrl = req.url
		req.url = path

		globalFileHandler(req, res, () => {
			req.url = originalUrl
			next()
		})
	}
}

function Server(site) {
	this.site = site

	this.setupConnect()
}

Server.prototype.setupConnect = function setupConnect() {
	this.app = connect()

	this.app.use(compression())

	this.app.use(bodyParser.urlencoded({ extended: true }))

	this.app.use(Cookies.connect())

	this.app.use((req, res, next) => this.handle(null, req, res).then(next, next))

	// TODO: only in debug mode
	this.app.use(handleBuildFiles(this.site.project))

	this.app.use(this.fileHandler())

	this.app.use((req, res, next) => this.handle(404, req, res).then(next, next))
	this.app.use((err, req, res, next) => this.handle(err, req, res).then(next, next))
}

Server.prototype.fileHandler = function fileHandler() {
	var opts = {}

	// we need this option or the file handler will serve our 404s
	opts.passthrough = true

	for (var i in this.site.project.files) {
		opts[i] = this.site.project.files[i]
	}

	if (process.env.DEBUG) {
		opts.cache = false
	}

	return st(opts)
}

Server.prototype.handle = async function handle(err, req, res) {
	if (err === 404) {
		err = new Error("Page not found")
		err.httpCode = 404
	}

	if (err && !err.httpCode) {
		err.httpCode = 500
	}

	var url = Url.parse(req.url)
	var path = err ? "error-" + err.httpCode : url.pathname

	var scope = this.site.resolve(path)

	if (!scope) {
		return err
	}

	scope.request = req

	var output = await this.site.process(scope)

	res.writeHead(output.status, output.headers)
	res.end(output.content)
}

Server.prototype.start = function start(network, callback) {
	if (this.httpServer && this.httpServer.address()) {
		this.stop(this.start.bind(this, callback))
		return
	}

	this.httpServer = http.createServer(this.app)
	this.httpServer.listen(network, "127.0.0.1", () => callback(this.httpServer.address()))
}

Server.prototype.stop = function stop(callback) {
	this.httpServer.close(callback)
}

module.exports = Server
