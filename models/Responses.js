const db = require('../data/dbconfig');

module.exports = {
	add,
	find,
	findBy,
	findById
};

// Create response
async function add(response) {
	const [id] = await db('responses')
		.insert(response)
		.returning('id');

	return findById(id);
}

// Get all responses
function find() {
	return db('responses');
}

// Get responses by filter
function findBy(filter) {
	return db('responses').where(filter);
}

// Get responses by id
function findById(id) {
	return db('responses')
		.where({ id })
		.first();
}
