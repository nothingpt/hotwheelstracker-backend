// index.js
// imports
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const User = require('./models/User');

require('dotenv').config();

const createServer = require('./createServer');

const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  
  if (token) {
    console.log(`token: ${token}`);
    const { userId } = jwt.verify(token, process.env.SECRET);

    req.userId = userId;
  }

  next();
});

server.express.use(async (req, res, next) => {
  if (!req.userId) {
    next();
  }

  next();
})

// start the server
server.start({ 
  cors: {
    credentials: true
  },  
  port: process.env.PORT || 7777 }, () =>
  console.log(`The server is running on port 7777`)
);
