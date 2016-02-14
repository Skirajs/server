#!/usr/bin/env node
var pathTool = require("path");
var Server = require("../lib/server");

if (process.argv.length > 2) {
	process.chdir(process.argv[2]);
}

var site = require(pathTool.resolve("site"));

var server = new Server(site);

server.start(function(addr) {
	console.log("Listening on %s:%d", addr.address, addr.port);
});
