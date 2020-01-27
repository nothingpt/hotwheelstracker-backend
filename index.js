// index.js
const mongoose = require("mongoose");
const { GraphQLServer } = require("graphql-yoga");

// .env file loading
require("dotenv").config();

const connectionString = `mongodb+srv://${process.env.USERLOGIN}:${process.env.USERPASS}@cluster0-ktixb.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

const db = mongoose.connect(connectionString);

// Typedefs
const typeDefs = require('./schemas/HotWheel');

// Resolvers
const resolvers = require('./resolvers/Hotwheels')

// Server 
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

// start the server
server.start({ port: process.env.PORT || 7777 }, () =>
  console.log(`The server is running on port 7777`)
);
