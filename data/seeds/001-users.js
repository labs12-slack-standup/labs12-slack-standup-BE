const bcrypt = require('bcryptjs');
const uuidv4 = require('uuidv4');
const moment = require('moment');

exports.seed = function(knex) {
	return knex('users').insert([
		{
			id: uuidv4(),
			email: 'ben@gmail.com',
			password: 'password',
			created_at: moment().format(),
			profilePic: '',
			roles: 'admin',
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
			roles: 'member',
			teamId: '2'
		}
	]);
};
