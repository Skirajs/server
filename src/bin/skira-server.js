#!/usr/bin/env node
/*eslint no-console: "off"*/
const serializeError = require("serialize-error")
const Server = require("../../")
const Site = require("skira-core")

const IS_WORKER = typeof process.send == "function"

function outputError(err) {
	if (IS_WORKER) {
		let obj = err

		if (err instanceof Error) {
			obj = serializeError(err)
		}

		process.send({ error: obj })
	}

	console.error(err.stack || err.toString())
}

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
	let specifiedPort = process.argv[2]
	let ipAddress = process.argv[3]

	if (typeof specifiedPort != "undefined" && !(/^\d+$/).test(specifiedPort)) {
		console.error("Invalid port specified:", process.argv[2])

		process.exit(1)
		return
	}

	let port = +specifiedPort || 0

	if (IS_WORKER) {
		await waitForStartSignal()

		// Signal that we are alive and understand this form of IPC.
		process.send({ start: true })
	}

	let site

	try {
		let siteData = require(process.cwd() + "/build/site.js")
		site = new Site(siteData)
		await site.init()
	} catch (err) {
		console.error("Could not load site:")
		outputError(err)

		process.exit(2)
		return
	}

	let server = new Server(site)
	let addr = await server.start(port, ipAddress)

	console.log("Listening on %s:%d", addr.address, addr.port)

	if (IS_WORKER) {
		process.send({ address: addr })
	}
}

function criticalError(err) {
	outputError(err)
	process.exit(3)
}

process.on("uncaughtException", criticalError)
process.on("unhandledRejection", criticalError)

Promise.resolve(startServer())
