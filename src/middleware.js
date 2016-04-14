const bodyParser = require("body-parser")
const compression = require("compression")
const connect = require("connect")
const Cookies = require("cookies")

function callbackPromise(promise, callback) {
	promise
		.then((...args) => callback(null, ...args))
		.catch((err) => callback(err))
}

exports.setup = function setupMiddleware(pageHandler, fileHandler) {
	var app = connect()

	app.use(compression())

	app.use(bodyParser.urlencoded({ extended: true }))

	app.use(Cookies.connect())

	app.use((req, res, next) => callbackPromise(pageHandler.run(null, req, res), next))

	if (fileHandler) {
		app.use(fileHandler)
	}

	app.use((req, res, next) => callbackPromise(pageHandler.run(404, req, res), next))
	app.use((err, req, res, next) => callbackPromise(pageHandler.run(err, req, res), next))

	return app
}
