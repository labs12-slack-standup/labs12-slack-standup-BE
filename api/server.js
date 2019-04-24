const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');

const GRAPHQL_PLAYGROUND_CONFIG = {
	folderName: 'Foo',
	settings: {
		'editor.cursorShape': 'line',
		'editor.fontSize': 14,
		'editor.reuseHeaders': true,
		'editor.theme': 'dark'
	}
};

const server = new ApolloServer({
	playground: process.env.NODE_ENV !== 'production',
	typeDefs,
	resolvers
});

module.exports = server;
