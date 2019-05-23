const jwt = require('jsonwebtoken');

function generateToken(user) {
	console.log('4', user)
	const payload = {
		subject: user.id || user.subject,
		roles: user.roles,
		teamId: user.teamId,
		joinCode: user.joinCode,
		slackTeamId: user.slackTeamId,
		slackUserId: user.slackUserId,
		slackToken: user.slackToken,
	};

	const options = {
		expiresIn: '7d'
	};

	console.log('TOKEN -------', payload);

	return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = {
	generateToken
};