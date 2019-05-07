const jwt = require('jsonwebtoken');

function generateTokenSlack(user) {

	const options = {
		expiresIn: '7d'
	};

	return jwt.sign(user, process.env.JWT_SECRET, options);
}

module.exports = {
	generateTokenSlack
};
