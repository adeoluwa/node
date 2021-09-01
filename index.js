const http = require('http');
const path = require('path');
const fs = require('fs');

const { data } = require('./first');
const { getReqData } = require('../events');

const server = http.createServer(async (req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    console.log(req.method);
    let homeFile = path.join(__dirname, 'views/index.html');
    let homePage = fs.readFileSync(homeFile, 'utf-8');
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(homePage);
    res.end();
  } else if (req.url === '/about' && req.method === 'GET') {
    let aboutFile = path.join(__dirname, 'views/about.html');
    let aboutPage = fs.readFileSync(aboutFile, 'utf-8');
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(aboutPage);
    res.end();
  } else if (req.url === '/contact-us' && req.method === 'GET') {
    let contactFile = path.join(__dirname, 'views/contact.html');
    let contactPage = fs.readFileSync(contactFile, 'utf-8');
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(contactPage);
    res.end();
  } else if (req.url === '/contact-us' && req.method === 'POST') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    let body = await getReqData(req);
    res.write(body)
    res.end()
  } else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end('<h1>Page not found </h1>');
  }
});

const port = 5000;
server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

// case '/api/names':
//   res.writeHead(200, { 'content-type': 'application/json' });
//   res.write(JSON.stringify(data));
//   res.end();
//   return;
