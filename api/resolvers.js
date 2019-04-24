const db = require('../data/dbconfig');

// A map of functions which return data for the schema.
module.exports = {
	Query: {
		info: () => 'Server is running',
		users(parent, args, ctx, info) {
			return db('users');
		}
	}
};
