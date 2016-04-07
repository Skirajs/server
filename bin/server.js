#!/usr/bin/env node
/*eslint no-console: "off"*/
const pathTool = require("path")
const Server = require("../")
const Site = require("skira-core")

var port = process.env.PORT

if (process.argv.length > 2) {
	try {
		port = parseInt(process.argv[2])
	} catch (err) {
		console.error("Invalid port specified:", process.argv[2])
		process.exit(1)
	}
}

var site

try {
	var siteData = require(pathTool.resolve("build/site.js"))
	site = new Site(siteData)
} catch (err) {
	console.error("Could not load site:")
	console.error(err.stack)
	process.exit(2)
}

var server = new Server(site)

server.start(port, (addr) => {
	console.log("Listening on %s:%d", addr.address, addr.port)
})
