const moment = require('moment');
const faker = require('faker');
const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
	const userSeeds = num => {
		const users = [];
		let team = 1;
		let count = 1;

		for (let i = 0; i < num; i++) {
			users.push({
				teamId: team,
				email: faker.internet.email(),
				password: bcrypt.hashSync('password', 4),
				fullName: faker.name.firstName(),
				roles: count === 1 ? 'admin' : 'member',
				profilePic: '',
				created_at: moment().format(),
				active: true
			});

			if (count + 1 === 6) {
				count = 1;
				team++;
			} else {
				count++;
			}
		}
		return users;
	};
	return knex('users').insert(userSeeds(25));
};
