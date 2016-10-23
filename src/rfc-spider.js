// Copyright 2016 Rodrigo Fernandes da Costa

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

const http = require('http');
const url = require('url');

class Task {
  constructor (agent, {uri, parse, body}) {
    if (typeof uri == 'string') this.config = url.parse(uri);
    this.config.agent = this.config.agent || agent;
    this.parse = parse;
    this.body = body;
    this.config.headers = this.config.headers || {
      'User-Agent': 'Mozilla/5.0',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.5'
    };
  }

  run () {
    return new Promise((resolve, reject) => {
      const request = http.request(this.config, response => {
        const buffer = [];
        response.on('data', data => buffer.push(data));
        response.on('end', () => {
          this.parse(Buffer.concat(buffer), response, request);
          resolve();
        });
      });

      request.on('error', reject);
      request.end(this.body);
    });
  }
}

class Spider {
  constructor (tasks = [], max = 50) {
    this.agent = new http.Agent({keepAlive: true});
    this.tasks = tasks;
    this.max = max;
  }

  crawl () {
    const promise = new Promise((resolve, reject) => {
      let running = 0;

      const consume = () => {
        let task = this.tasks.shift();

        if (task) {
          task = new Task(this.agent, task);
          running += 1;
          task.run().then(() => {
            running -= 1;
            consume();
          }).catch(reject);
        } else if (!running) {
          resolve();
        }
      }
      
      if (!this.tasks.length) return resolve();
      
      for (let task of this.tasks.splice(0, this.max)) {
        task = new Task(this.agent, task);
        task.run().then(consume);
      }
    });

    return promise.then(() => {
      this.agent.destroy();
    });
  }
}

module.exports = Spider;
