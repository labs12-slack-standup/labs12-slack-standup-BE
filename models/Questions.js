const db = require('../data/dbconfig');

module.exports = {
	add,
	find,
	findBy
};

// Create question
async function add(question) {
	const [id] = await db('questions')
		.insert(question)
		.returning('id');

	return findById(id);
}

// Get all questions
function find() {
	return db('questions');
}

// Get question by id
function findById(id) {
	return db('questions')
		.where({ id })
		.first();
}
