#!/usr/bin/env node
var fs = require("fs");
var pathTool = require("path");
var Server = require("../");

var port = process.env.PORT;

if (process.argv.length > 2) {
	try {
		port = parseInt(process.argv[2]);
	} catch (err) {
		console.error("Invalid port specified:", process.argv[2]);
		process.exit(1);
	}
}

var site;

try {
	site = require(pathTool.resolve("site"));
} catch (err) {
	console.error("Could not load site.js:");
	console.error(err.stack);
	process.exit(2);
}

var server = new Server(site);

server.start(port, function(addr) {
	console.log("Listening on %s:%d", addr.address, addr.port);
});
