const uuidv4 = require('uuidv4');
const moment = require('moment');
const faker = require('faker');

// exports.seed = function(knex) {
// 	const userSeeds = num => {
// 		const users = [];
// 		for (let i = 0; i < num; i++) {
// 			users.push({
// 				id: uuidv4(),
// 				email: faker.internet.email(),
// 				password: bcrypt.hashSync('password', 10),
// 				created_at: moment().format(),
// 				profilePic: '',
// 				roles:
// 					Math.round(Math.random() * 5) === 5
// 						? 'admin'
// 						: 'member',
// 				teamId: JSON.stringify(
// 					Math.floor(Math.random() * 50)
// 				)
// 			});
// 		}
// 		return users;
// 	};
// 	return knex('users').insert(userSeeds(500));
// };

exports.seed = function(knex) {
	return knex('users').insert([
		{
			id: uuidv4(),
			email: 'ben@gmail.com',
			password: 'password',
			created_at: moment().format(),
			profilePic: '',
			roles: 'member',
			teamId: '1'
		},
		{
			id: uuidv4(),
			email: 'alice@gmail.com',
			password: 'password',
			created_at: moment().format(),
			profilePic: '',
			roles: 'member',
			teamId: '1'
		},
		{
			id: uuidv4(),
			email: 'bob@gmail.com',
			password: 'password',
			created_at: moment().format(),
			profilePic: '',
			roles: 'admin',
			teamId: '1'
		}
	]);
};
