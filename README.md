# skira-server

Server for serving skira sites from the back-end.

[![Build Status][ci-image]][ci-url]
[![Dependency Status][deps-image]][deps-url]
[![devDependency Status][devdeps-image]][devdeps-url]
[![Chat][chat-image]][chat-url]

## Status

Skira is still in active development. We are working towards a final release ASAP (1.0.0) and will then keep the API stable.

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install -g skira-server
```

## Usage

Inside your project folder you only have to run the following command. It expects build/site.js to be present.

```sh
skira-server 8000 127.0.0.1
```

The port `8000` and IP address `127.0.0.1` are optional and for demonstration purposes.

## License

MIT

[ci-image]: https://img.shields.io/travis/skira-project/server.svg
[ci-url]: https://travis-ci.org/skira-project/server
[deps-image]: https://img.shields.io/david/skira-project/server.svg
[deps-url]: https://david-dm.org/skira-project/server
[devdeps-image]: https://img.shields.io/david/dev/skira-project/server.svg
[devdeps-url]: https://david-dm.org/skira-project/server#info=devDependencies
[chat-image]: https://img.shields.io/gitter/room/skira-project/skira.svg
[chat-url]: https://gitter.im/skira-project/skira
