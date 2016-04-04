# Spider

This is a node module that allows you to create crawlers of websites.

## Usage

This module contains a single class called spider. The constructor of this class receives an object as argument. This object can have the following properties:

* `tasks`: Array of `{uri: url, body: data, parse: function (data, response, request)}` the `uri` is passed to node's `http.request` API together with the optional body. Data, response and request comes from node, the data is the concatenated buffer.
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
