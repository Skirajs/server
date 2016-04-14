#!/usr/bin/env node
/*eslint no-console: "off"*/
const pathTool = require("path")
const serializeError = require("serialize-error")
const Server = require("../")
const Site = require("skira-core")

const IS_WORKER = typeof process.send == "function"

async function waitForStartSignal() {
	await new Promise((resolve) => {
		function handleStartSignal(m) {
			if (m && m.start) {
				process.removeListener("message", handleStartSignal)
				setImmediate(resolve)
			}
		}

		process.on("message", handleStartSignal)
	})
}

async function startServer() {
	var specifiedPort = process.argv[2]
	var ipAddress = process.argv[3]

	if (typeof specifiedPort != "undefined" && !(/^\d+$/).test(specifiedPort)) {
		console.error("Invalid port specified:", process.argv[2])

		process.exit(1)
		return
	}

	var port = +specifiedPort || 0

	if (IS_WORKER) {
		await waitForStartSignal()

		// Signal that we are alive and understand this form of IPC.
		process.send({ start: true })
	}

	var site

	try {
		var siteData = require(pathTool.resolve("build/site.js"))
		site = new Site(siteData)
	} catch (err) {
		console.error("Could not load site:")
		console.error(err.stack)

		process.exit(2)
		return
	}

	var server = new Server(site)
	var addr = await server.start(port, ipAddress)

	console.log("Listening on %s:%d", addr.address, addr.port)

	if (IS_WORKER) {
		process.send({ address: addr })
	}
}

if (IS_WORKER) {
	process.on("uncaughtException", (err) => {
		process.send({ error: serializeError(err) })
		process.exit(3)
	})
}

Promise.resolve(startServer())
