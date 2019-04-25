const { ApolloServer, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
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

// restricted will run an auth token validation on all operations, except SignupUser & LoginUser Mutations which will bypass
// the check and run straight through to the SignupUser & LoginUser resolver.

// A token verified successfully will be passed to the context object, and carried to the resolver (third param
// in the resolver) where we can  extract the decoded objects properties to query the model, a token that
// fails verifiction will throw an AuthenticationError.

const restricted = ({ headers, body }) => {
	const token = headers.authorization;
	const operation = body.operationName;
	try {
		if (operation !== 'SignupUser' && operation !== 'LoginUser') {
			const { userId } = jwt.verify(
				token,
				process.env.JWT_SECRET
			);
			return { userId }; // Our token will return the userId, Roles, Teams.
		}
	} catch (err) {
		throw new AuthenticationError('You must be logged in', 401);
	}
};

const server = new ApolloServer({
	playground: true,
	introspection: true,
	typeDefs,
	resolvers
	// context: ({ req }) => restricted(req)
});

module.exports = server;
