function Handler(site) {
	this.site = site
}

Handler.prototype.run = async function handleRequest(err, req, res) {
	if (err === 404) {
		err = new Error("Page not found")
		err.httpCode = 404
	}

	if (err && !err.httpCode) {
		err.httpCode = 500
	}

	let path = err ? "error-" + err.httpCode : req.url.split(/\?|&/)[0]
	let scope = this.site.resolve(path)

	if (!scope || !scope.page) {
		throw err
	}

	scope.request = req

	let output = await this.site.process(scope)

	res.writeHead(output.status, output.headers)
	res.end(output.content)
}

module.exports = Handler
