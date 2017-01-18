const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

const ip = '127.0.0.1';
const port = 10000;
const imageDir = '/path/to/img/';

const template = fs.readFileSync('template.htm').toString();

const server = http.createServer((req, res) => {
    var query = url.parse(req.url,true).query;
    req = query.i;

    if (typeof req === 'undefined') {
        getImages(imageDir, function (err, files) {
        	var num = Math.floor(Math.random() * (files.length-1));
        	console.log('Selecting image: ' + num + ' (' + files[num] + ')')
            var html = template.replace('{0}', files[num]);
            res.writeHead(200, {'Content-type':'text/html'});
            res.end(html);
        });
    } else {
        fs.readFile(imageDir + req, function (err, content) {
                res.writeHead(200,{'Content-type':'image/gif'});
                res.end(content);
        });
    }

});

server.listen(port, ip, () => {
  console.log(`Server running at http://${ip}:${port}/`);
});

function getImages(imageDir, callback) {
    var fileType = '.gif', files = [], i;
    fs.readdir(imageDir, function (err, list) {
        for(i=0; i<list.length; i++) {
            if(path.extname(list[i]) === fileType) {
                files.push(list[i]);
            }
        }
        callback(err, files);
    });
}
