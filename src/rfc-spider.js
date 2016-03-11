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

var http = require('http');

function spider(self) {

    self.tasks = self.tasks || [];
    self.blacklist = self.blacklist || [];
    self.delay = self.delay || 50;
    self.loop = self.loop || false;
    self.max = self.max || 50;
    self.connections = 0;
    self.scheduled = false;

    self.request = function () {
        if (self.connections > self.max) return false;
        if (!self.tasks.length) return false;

        var task = self.tasks.pop();

        if (~self.blacklist.indexOf(task.uri)) return false;
        if (!self.loop) self.blacklist.push(task.uri);

        self.connections = self.connections + 1;

        var request = http.request(task.uri, function (response) {
            var buffer = [];

            response.on("data", function (data) {
                buffer.push(data);
            });

            response.on("end", function () {
                buffer = Buffer.concat(buffer);
                task.parse(buffer, response, request);
                self.connections = self.connections - 1;
                self.crawl();
            });
        }).on("error", function (error) {
            var message = error.message + ': ' + task.uri;
            console.log(message.slice(0, 80));
        });

        request.end();
        
        return true;
    };

    self.crawl = function () {
        if (self.scheduled) return;
        
        if (self.request()) {
            setTimeout(function () {
                self.scheduled = false;
                self.crawl();
            }, self.delay);

            self.scheduled = true;
        } else if (!self.connections && !self.tasks.lenght && self.exit) {
            self.exit();
        }
    };

    return self;
}

module.exports = spider;
