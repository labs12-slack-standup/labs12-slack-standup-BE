const crypto = require('crypto');
const timingSafeCompare = require('tsscmp');

function isVerified(req) {
	const signature = req.headers['x-slack-signature'];
	//console.log('sig', signature);
	const timestamp = req.headers['x-slack-request-timestamp'];
	//console.log('ts', timestamp);
	const hmac = crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET);
	//console.log('hmac', hmac);
	const [version, hash] = signature.split('=');
	//console.log('hash', hash);
	// Check if the timestamp is too old
	const fiveMinutesAgo = ~~(Date.now() / 1000) - 60 * 5;
	if (timestamp < fiveMinutesAgo) return false;

	hmac.update(`${version}:${timestamp}:${req.rawBody}`);

	// check that the request signature matches expected value
	return timingSafeCompare(hmac.digest('hex'), hash);
}

function slackVerification(req, res, next) {
	if (!isVerified(req)) {
		res.sendStatus(404);
		return;
	}
	next();
}

module.exports = {
	slackVerification
};
