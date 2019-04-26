const jwt = require('jsonwebtoken');

function generateToken(user) {
	const payload = {
		subject: user.id,
		roles: user.roles,
		teamId: user.teamId
	};

	const options = {
		expiresIn: '7d'
	};

	return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = {
	generateToken
};
