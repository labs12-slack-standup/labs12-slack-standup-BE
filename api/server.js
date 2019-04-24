const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

module.exports = server;