const db = require('../../data/dbconfig');

module.exports = {
	Users,
	User,
	UserByEmail
};

function Users(parent, args, ctx, info) {
	return db('users');
}

async function User(parent, { id, email }, ctx, info) {
	const [user] = await db('users').where({ id });
	console.log(user);
	return user;
}

async function UserByEmail(parent, { email }, ctx, info) {
	const [user] = await db('users').where({ email });
	console.log(user);
	return user;
}
