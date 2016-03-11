# Spider

This is a node module that allows you to create crawlers of websites.

## Usage

This module contains a single class called spider. The constructor of this class receives an object as argument. This object can have the following properties:

* `tasks`: Array of `{uri: url, parse: function (data, response, request)}` the `url` is passed to [http.request](https://nodejs.org/api/http.html#http_http_request_options_callback), `request` is the return of the [http.request](https://nodejs.org/api/http.html#http_http_request_options_callback) and the `response` is the argument of the callback.
* `blacklist`: An array of urls to not be requested. Same format as the `url` in `tasks`.
* `delay`: Delay between requests, defaults to 50.
* `loop`: Blacklist requests already made. `true` to allow loops.
* `max`: Maximum number of connections, defaults to 50.

Import `spider` like this:

    var spider = require("rfc-spider");

Call `crawl` to start crawling like this:

    spider({tasks: tasks, ...}).crawl();

## Install

    npm install rfc-spider

## License

The source code is licensed under GPL v3. License is available [here](/LICENSE.md).