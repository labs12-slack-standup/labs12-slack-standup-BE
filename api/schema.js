const { gql } = require('apollo-server');

module.exports = gql`
	type Query {
		info: String!
		Users: [User!]!
		User(id: ID!): User!
		UserByEmail(email: String!): User!
	}

	type User {
		id: ID!
		email: String!
		password: String!
		created_at: String!
		profilePic: String
		roles: String!
		teamId: ID
	}

`;
