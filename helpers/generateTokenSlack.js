const jwt = require('jsonwebtoken');

function generateTokenSlack(user) {

	const options = {
		expiresIn: '7d'
	};

	console.log('SLACK TOKEN ----', user);

	return jwt.sign(user, process.env.JWT_SECRET, options);
}

module.exports = {
	generateTokenSlack
};
