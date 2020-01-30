const { GraphQLServer } = require("graphql-yoga");

// Typedefs
const typeDefs = require('./schemas/HotWheel');

// Resolvers
const resolvers = require('./resolvers/Hotwheels')

// db
const db = require('./db');

function createServer () {
  // Server 
  return new GraphQLServer({
    debug: true,
    typeDefs,
    resolvers,
    context: req => ({
      ...req,
      db
    })
  });
};

module.exports = createServer;
