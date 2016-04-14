function Handler(site) {
	this.site = site
}

Handler.prototype.handleRequest = async function handleRequest(err, req, res) {
	if (err === 404) {
		err = new Error("Page not found")
		err.httpCode = 404
	}

	if (err && !err.httpCode) {
		err.httpCode = 500
	}

	var url = req.url.split(/\?|&/)[0]
	var path = err ? "error-" + err.httpCode : url.pathname

	var scope = this.site.resolve(path)

	if (!scope || !scope.page) {
		throw err
	}

	scope.request = req

	var output = await this.site.process(scope)

	res.writeHead(output.status, output.headers)
	res.end(output.content)
}

module.exports = Handler