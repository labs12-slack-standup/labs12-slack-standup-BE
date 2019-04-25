const uuidv4 = require('uuidv4');
const moment = require('moment');
const faker = require('faker');
const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
	const userSeeds = num => {
		const users = [];
		for (let i = 0; i < num; i++) {
			users.push({
				email: faker.internet.email(),
				password: bcrypt.hashSync('password', 4),
				created_at: moment().format(),
				profilePic: '',
				roles:
					Math.round(Math.random() * 5) === 5
						? 'admin'
						: 'member',
				teamId: JSON.stringify(
					Math.floor(Math.random() * 50)
				)
			});
		}
		return users;
	};
	return knex('users').insert(userSeeds(500));
};
