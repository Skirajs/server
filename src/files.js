const st = require("st")

exports.setup = function setupFileHandler(site) {
	var opts = {}

	// we need this option or the file handler will serve our 404s
	opts.passthrough = true

	for (var i in site.project.files) {
		opts[i] = site.project.files[i]
	}

	if (process.env.DEBUG) {
		opts.cache = false
	}

	return st(opts)
}
