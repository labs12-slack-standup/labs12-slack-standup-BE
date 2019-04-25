const db = require('../data/dbconfig');
const {
	Users,
	User,
	UsersByRoles,
	UsersByTeam
} = require('../controllers/Users/Users.resolvers');

// A map of functions which return data for the schema.
module.exports = {
	Query: {
		Users,
		User,
		UsersByRoles,
		UsersByTeam
	}
};
