const bcrypt = require('bcryptjs');
const uuidv4 = require('uuidv4');
const moment = require('moment');
const faker = require('faker');

exports.seed = function(knex) {
	const userSeeds = num => {
		const users = [];
		for (let i = 0; i < num; i++) {
			users.push({
				id: uuidv4(),
				email: faker.internet.email(),
				password: bcrypt.hashSync('password', 10),
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
