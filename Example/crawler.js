/*
  This is an example on how to use rfc-spider.js.
  You can serve the index.html using http-server.
*/

const url = require('url');
const Spider = require('../src/rfc-spider.js');

const tasks = [{
  uri: 'http://127.0.0.1:8080/index.html',
  parse: index
}];

const messages = [];

function index(data) {
  data = data.toString();

  const pattern = /href\s*=\s*(['"])(.*?)\1/g;
  let match;
  while (match = pattern.exec(data)) {
    tasks.push({
      uri: 'http://127.0.0.1:8080/' + match[2],
      parse: file
    });
  }
}

function file(data) {
  messages.push(data.toString().trim());
}

function exit() {
  console.log(messages.join(' '));
}

new Spider(tasks).crawl().then(exit);
