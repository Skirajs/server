const st = require("st")

exports.setup = function setupFileHandler(site) {
	let opts = {
		path: process.cwd() + "/public",
		passthrough: true,
		index: false,
	}

	// we need this option or the file handler will serve our 404s
	opts.passthrough = true

	for (let i in site.project.files) {
		opts[i] = site.project.files[i]
	}

	if (process.env.DEBUG) {
		opts.cache = false
	}

	return st(opts)
}
