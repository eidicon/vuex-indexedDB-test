const http = require('http');
const { createReadStream } = require('fs');
const port = 3000;

const requestHandler = async (request, response) => {
  if (request.url === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    createReadStream('./public/index.html').pipe(response);
  } else if ((request.url === '/dist/build.js')) {
    response.writeHead(200, {
      'Content-Type': 'text/javascript'
    });
    createReadStream('./public/dist/build.js').pipe(response);
  }

}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})