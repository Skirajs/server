var bodyParser = require("body-parser");
var clone = require("clone");
var compression = require("compression");
var connect = require("connect");
var http = require("http");
var Processor = require("skira-core").Processor;
var Router = require("skira-core").Router;
var st = require("st");
var Url = require("url");

function Server(site) {
	this.site = site;
	this.processor = new Processor(site);
	this.router = new Router(site);

	this.setupConnect();
}

Server.prototype.setupConnect = function() {
	this.app = connect();

	this.app.use(compression());

	this.app.use(bodyParser.urlencoded({
		extended: true
	}));

	this.app.use(this.handle.bind(this, null));

	if (this.site.config.files) {
		this.app.use(this.fileHandler());
	}

	this.app.use(this.handle.bind(this, 404));
	this.app.use(this.handle.bind(this));
};

Server.prototype.fileHandler = function() {
	var files = clone(this.site.config.files);

	files.passthrough = true;
	files.gzip = false;

	return st(files);
};

Server.prototype.handle = function(err, req, res, next) {
	if (err == 404) {
		err = new Error("Page not found");
		err.httpCode = 404;
	}

	if (err && !err.httpCode) {
		err.httpCode = 500;
	}

	var url = Url.parse(req.url);
	var path = err ? "error-" + err.httpCode : url.pathname;

	var page = this.router.resolve(path);

	if (!page) {
		next(err);
		return;
	}

	var output = this.processor.render(page, req);

	res.writeHead(output.status, output.headers);
	res.end(output.content);
};

Server.prototype.start = function(callback) {
	if (this.httpServer && this.httpServer.address()) {
		this.stop(this.start.bind(this, callback));
		return;
	}

	var helper = function() {
		callback(this.httpServer.address());
	};

	this.httpServer = http.createServer(this.app);
	this.httpServer.listen(this.site.config.network, helper.bind(this));
};

Server.prototype.stop = function(callback) {
	this.httpServer.close(callback);
};

module.exports = Server;
