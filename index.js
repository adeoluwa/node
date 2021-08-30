const http = require('http');
const path = require('path');
const fs = require('fs');

const { data } = require('./first');

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      let homeFile = path.join(__dirname, 'views/index.html');
      let homePage = fs.readFileSync(homeFile, 'utf-8');
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write(homePage);
      res.end();
      return;

    case '/about':
      let aboutFile = path.join(__dirname, 'views/about.html');
      let aboutPage = fs.readFileSync(aboutFile, 'utf-8');
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write(aboutPage);
      res.end();
      return;

    case '/contact':
      let contactFile = path.join(__dirname, 'views/contact.html');
      let contactPage = fs.readFileSync(contactFile, 'utf-8');
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write(contactPage);
      res.end();
      return;

    case '/api/names':
      res.writeHead(200, { 'content-type': 'application/json' });
      res.write(JSON.stringify(data));
      res.end();
      return;

    default:
      res.writeHead(404, { 'content-type': 'text/html' });
      res.write('<h1>Page not found </h1>');
      res.end();
      return;
  }
});

const port = 5000;
server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
