const db = require('../data/dbconfig');

module.exports = {
	add,
	find,
	findBy,
	findByRole,
	findById,
	findByTeam,
	update,
	remove
};

// Create User
async function add(user) {
	const [id] = await db('users')
		.insert(user)
		.returning('id');

	return findById(id);
}

// Get all users
function find() {
	return db('users');
}

// Get user by id
function findById(id) {
	return db('users')
		.where({ id })
		.first();
}

// Get user by filter
function findBy(filter) {
	return db('users').where(filter);
}

// Get user by role
async function findByRole(roles) {
	const users = await db('users').where({ roles });
	return users;
}

// Get user by team id
async function findByTeam(teamId) {
	const users = await db('users').where({ teamId });
	return users;
}

// Update user
async function update(id, user) {
	await db('users')
		.where({ id })
		.update(user);

	return findById(id);
}

// Delete user
function remove(id) {
	return db('users')
		.where({ id })
		.del();
}
