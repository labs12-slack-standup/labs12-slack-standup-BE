const db = require('../../data/dbConfig');

module.exports = {
	find,
	findByRole,
	findById,
	findByTeam
};

// Get all users
function find() {
	return db('users');
}

function findById(id) {
	return db('users')
		.where({ id })
		.first();
}

async function findByRole(roles) {
	const users = await db('users').where({ roles });
	return users;
}

async function findByTeam(teamId) {
	const users = await db('users').where({ teamId });
	console.log(users);
	return users;
}
