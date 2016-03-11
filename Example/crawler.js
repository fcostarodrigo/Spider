// Copyright 2015 Rodrigo Fernandes da Costa

/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// Author: Rodrigo Fernandes da Costa
// E-mail: fcostarodrigo@yahoo.com

/*
    This is an example on how to use spider.js.
    You can serve the index.html using python -m SimpleHTTPServer.
*/

var url = require('url');
var spider = require("../src/rfc-spider.js");

var tasks = [{
    uri: "http://127.0.0.1:8000/index.html",
    parse: index
}];

var messages = [];

function index(data) {
    data = data.toString();

    var pattern = /href\s*=\s*(['"])(.*?)\1/g;
    var match;
    while (match = pattern.exec(data)) {
        tasks.unshift({
            uri: "http://127.0.0.1:8000/" + match[2],
            parse: file
        });
    }
}

function file(data) {
    messages.push(data.toString().trim());
}

function exit() {
    console.log(messages.join(" "));
}

spider({tasks: tasks, exit: exit}).crawl();
