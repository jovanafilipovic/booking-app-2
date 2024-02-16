
const http = require('http')

const server = http.createServer((request, response) => {
    let path = request.url;
  
    if(path === '/' || path === '/home') {
      response.end('HOMEPAGE')
    }else if(path === '/reservation') {

    }else if(path === '/login') {

    }else if(path === '/signup') {

    }else {
        response.end('Error 404: Page not found')
    }
  })
  
  server.listen(8000, '127.0.0.1', () => {
    console.log("Server has started!")
  })