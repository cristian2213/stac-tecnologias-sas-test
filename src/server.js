require('dotenv').config();
const http = require('http');
const app = require('./app.js');

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, HOST, () => {
    console.info(`Server's running on the host http://${HOST}:${PORT} `);
  });
}

startServer();
