const db = require('../data/dbconfig');
const { Users, User } = require('../controllers/Users/Users.resolvers');

// A map of functions which return data for the schema.
module.exports = {
	Query: {
		Users,
		User
		// info: () => 'Server is running',
		// users(parent, args, ctx, info) {
		// 	return db('users');
		// },
	}
};
