# Spider

This is a node module that allows you to create crawlers of websites.

It basically manages multiple requests, and concatenate the chunked data from
node before passing to the provided parser. The parser can add more tasks based
on the data parsed. The number of concurrent requests is limited to avoid
overload.

## Usage

This module contains a single class called Spider.

`new Spider(tasks[, max = 50])`

* `tasks`: Array of `{uri: string|object, parse, body}`
* `parse`: `function(Buffer data, http.IncomingMessage response, http.ClientRequest
 request)`
* `max`: Maximum number of concurrent requests

If `uri` is a string, then it parsed with `url.parse`.
The object is then passed to `http.request`.
A default `http.Agent` and headers are used if not present in object.
The `body` is passed to `http.ClientRequest.end` method, this can be useful for
POST.

The parse function receives the concatenated data from multiple data events.
It can add more tasks based on the data parsed.
You can use the method `toString` to convert the data to a string.

See the example in the code for more details.

## Install

    npm install rfc-spider

## License

The source code is licensed under GPL v3. License is available [here](/LICENSE.md).
