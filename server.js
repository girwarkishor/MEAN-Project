const http = require('http');

const server = http.createServer((req, res) => {
    res.end('This my first response');
});

server.listen(process.env.PORT || 3000)
