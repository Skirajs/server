const Handler = require("./handler")
const http = require("http")
const setupFileHandler = require("./files").setup
const setupMiddleware = require("./middleware").setup

function Server(site) {
	var pageHandler = new Handler(site)
	var fileHandler = setupFileHandler(site)

	this.app = setupMiddleware(pageHandler, fileHandler)
}

Server.prototype.start = async function start(port, ip) {
	await this.stop()

	this.httpServer = http.createServer(this.app)

	await new Promise((resolve) => {
		this.httpServer.listen(port, ip, resolve)
	})

	return this.httpServer.address()
}

Server.prototype.stop = async function stop() {
	if (!this.httpServer) {
		return
	}

	await new Promise((resolve) => {
		this.httpServer.close(resolve)
	})

	delete this.httpServer
}

module.exports = Server
