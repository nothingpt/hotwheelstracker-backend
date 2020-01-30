// index.js
// imports
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const User = require('./models/User');

require('dotenv').config();

const createServer = require('./createServer');

const server = createServer();

// server.express.use(bodyParser.urlencoded({ extended: true}));
// server.express.use(bodyParser.json());

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = jwt.verify(token, process.env.SECRET);
    req.userId = userId;
  }

  next();
});

// start the server
server.start({
  cors: {
    credentials: true,
    origin: 'http://localhost:3000'
  },
  port: process.env.PORT || 7777 }, () =>
  console.log(`The server is running on port 7777`)
);
