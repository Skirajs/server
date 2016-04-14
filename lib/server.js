"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Handler = require("./handler");
const http = require("http");
const setupFileHandler = require("./files").setup;
const setupMiddleware = require("./middleware").setup;

function Server(site) {
	var pageHandler = new Handler(site);
	var fileHandler = setupFileHandler(site);

	this.app = setupMiddleware(pageHandler, fileHandler);
}

Server.prototype.start = (() => {
	var ref = (0, _asyncToGenerator3.default)(function* (port, ip) {
		var _this = this;

		if (this.httpServer && this.httpServer.address()) {
			yield this.stop();
		}

		this.httpServer = http.createServer(this.app);

		yield new _promise2.default(function (resolve) {
			_this.httpServer.listen(port, ip, function () {
				return resolve(_this.httpServer.address());
			});
		});
	});

	function start(_x, _x2) {
		return ref.apply(this, arguments);
	}

	return start;
})();

Server.prototype.stop = (() => {
	var ref = (0, _asyncToGenerator3.default)(function* () {
		var _this2 = this;

		yield new _promise2.default(function (resolve) {
			_this2.httpServer.close(resolve);
		});
	});

	function stop() {
		return ref.apply(this, arguments);
	}

	return stop;
})();

module.exports = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTSxVQUFVLFFBQVEsV0FBUixDQUFWO0FBQ04sTUFBTSxPQUFPLFFBQVEsTUFBUixDQUFQO0FBQ04sTUFBTSxtQkFBbUIsUUFBUSxTQUFSLEVBQW1CLEtBQW5CO0FBQ3pCLE1BQU0sa0JBQWtCLFFBQVEsY0FBUixFQUF3QixLQUF4Qjs7QUFFeEIsU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQXNCO0FBQ3JCLEtBQUksY0FBYyxJQUFJLE9BQUosQ0FBWSxJQUFaLENBQWQsQ0FEaUI7QUFFckIsS0FBSSxjQUFjLGlCQUFpQixJQUFqQixDQUFkLENBRmlCOztBQUlyQixNQUFLLEdBQUwsR0FBVyxnQkFBZ0IsV0FBaEIsRUFBNkIsV0FBN0IsQ0FBWCxDQUpxQjtDQUF0Qjs7QUFPQSxPQUFPLFNBQVAsQ0FBaUIsS0FBakI7MkNBQXlCLFdBQXFCLElBQXJCLEVBQTJCLEVBQTNCLEVBQStCOzs7QUFDdkQsTUFBSSxLQUFLLFVBQUwsSUFBbUIsS0FBSyxVQUFMLENBQWdCLE9BQWhCLEVBQW5CLEVBQThDO0FBQ2pELFNBQU0sS0FBSyxJQUFMLEVBQU4sQ0FEaUQ7R0FBbEQ7O0FBSUEsT0FBSyxVQUFMLEdBQWtCLEtBQUssWUFBTCxDQUFrQixLQUFLLEdBQUwsQ0FBcEMsQ0FMdUQ7O0FBT3ZELFFBQU0sc0JBQVksVUFBQyxPQUFELEVBQWE7QUFDOUIsU0FBSyxVQUFMLENBQWdCLE1BQWhCLENBQXVCLElBQXZCLEVBQTZCLEVBQTdCLEVBQWlDO1dBQU0sUUFBUSxNQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsRUFBUjtJQUFOLENBQWpDLENBRDhCO0dBQWIsQ0FBbEIsQ0FQdUQ7RUFBL0I7O1VBQWU7Ozs7O0lBQXhDOztBQVlBLE9BQU8sU0FBUCxDQUFpQixJQUFqQjsyQ0FBd0IsYUFBc0I7OztBQUM3QyxRQUFNLHNCQUFZLFVBQUMsT0FBRCxFQUFhO0FBQzlCLFVBQUssVUFBTCxDQUFnQixLQUFoQixDQUFzQixPQUF0QixFQUQ4QjtHQUFiLENBQWxCLENBRDZDO0VBQXRCOztVQUFlOzs7OztJQUF2Qzs7QUFNQSxPQUFPLE9BQVAsR0FBaUIsTUFBakIiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgSGFuZGxlciA9IHJlcXVpcmUoXCIuL2hhbmRsZXJcIilcclxuY29uc3QgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpXHJcbmNvbnN0IHNldHVwRmlsZUhhbmRsZXIgPSByZXF1aXJlKFwiLi9maWxlc1wiKS5zZXR1cFxyXG5jb25zdCBzZXR1cE1pZGRsZXdhcmUgPSByZXF1aXJlKFwiLi9taWRkbGV3YXJlXCIpLnNldHVwXHJcblxyXG5mdW5jdGlvbiBTZXJ2ZXIoc2l0ZSkge1xyXG5cdHZhciBwYWdlSGFuZGxlciA9IG5ldyBIYW5kbGVyKHNpdGUpXHJcblx0dmFyIGZpbGVIYW5kbGVyID0gc2V0dXBGaWxlSGFuZGxlcihzaXRlKVxyXG5cclxuXHR0aGlzLmFwcCA9IHNldHVwTWlkZGxld2FyZShwYWdlSGFuZGxlciwgZmlsZUhhbmRsZXIpXHJcbn1cclxuXHJcblNlcnZlci5wcm90b3R5cGUuc3RhcnQgPSBhc3luYyBmdW5jdGlvbiBzdGFydChwb3J0LCBpcCkge1xyXG5cdGlmICh0aGlzLmh0dHBTZXJ2ZXIgJiYgdGhpcy5odHRwU2VydmVyLmFkZHJlc3MoKSkge1xyXG5cdFx0YXdhaXQgdGhpcy5zdG9wKClcclxuXHR9XHJcblxyXG5cdHRoaXMuaHR0cFNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKHRoaXMuYXBwKVxyXG5cclxuXHRhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG5cdFx0dGhpcy5odHRwU2VydmVyLmxpc3Rlbihwb3J0LCBpcCwgKCkgPT4gcmVzb2x2ZSh0aGlzLmh0dHBTZXJ2ZXIuYWRkcmVzcygpKSlcclxuXHR9KVxyXG59XHJcblxyXG5TZXJ2ZXIucHJvdG90eXBlLnN0b3AgPSBhc3luYyBmdW5jdGlvbiBzdG9wKCkge1xyXG5cdGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcblx0XHR0aGlzLmh0dHBTZXJ2ZXIuY2xvc2UocmVzb2x2ZSlcclxuXHR9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZlclxyXG4iXX0=