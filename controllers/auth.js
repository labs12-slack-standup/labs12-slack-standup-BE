const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const moment = require('moment');
const axios = require('axios');
const qs = require('qs');
const { generateToken } = require('../helpers/generateToken');
const { generateTokenSlack } = require('../helpers/generateTokenSlack');
const admin = require('firebase-admin');
const authenticate = require('../middleware/authenticate');

router.post('/register', async (req, res) => {
	try {
		let user = req.body;

		let existingUser = await Users.findBy({ email: user.email });
		if (existingUser.length) {
			return res.status(409).json({
				message: 'Sorry but that email already exists'
			});
		}

		user.password = await bcrypt.hashSync(user.password, 10);
		let newUser = await Users.add(user);
		token = await generateToken(newUser);

		res.status(201).json(token);
	} catch (error) {
		res.status(500).json({
			message: 'Sorry but something went wrong while registering',
			error
		});

		throw new Error(error);
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await Users.findBy({ email }).first();

		if (user && bcrypt.compareSync(password, user.password)) {
			const token = generateToken(user);
			return res.status(200).json({ token });
		}

		return res.status(401).json({
			message: 'Sorry incorrect username or password'
		});
	} catch (error) {
		res.status(500).json({
			message: 'Sorry but something went wrong while logging in'
		});

		throw new Error(error);
	}
});

// Firebase config - to be extracted out to another file.

const config = {
	type: 'service_account',
	project_id: process.env.PROJECT_ID,
	private_key_id: process.env.PRIVATE_KEY_ID,
	private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
	client_email: process.env.CLIENT_EMAIL,
	client_id: process.env.CLIENT_ID,
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url: process.env.CLIENT_URL
};

admin.initializeApp({ credential: admin.credential.cert(config) });

// UPDATES NEEDED: We will need to bring in the timezone.
router.post('/firebase', async ({ body }, res) => {
	// deconstruct access token
	const { accessToken } = body.user.stsTokenManager;
	try {
		// verify access token with Firebase admin.
		const {
			email,
			name: fullName,
			picture: profilePic
		} = await admin.auth().verifyIdToken(accessToken);
		// desconstructed variables form the userObj to be inserted into Users Model
		const userObj = {
			teamId: null,
			email,
			password: null,
			fullName,
			roles: 'member',
			profilePic,
			created_at: moment().format(),
			timezone: body.timezone,
			joinCode: null
		};

		// First we check if the email belongs to an exisitng user
		const [existingUser] = await Users.findBy({ email });
		// If true we generate a token and return it back to the client
		if (existingUser) {
			const token = generateToken(existingUser);
			console.log(token);
			res.status(201).json(token);
			// If false we add the userObj to the User Model, generate a token and return it back to the client
		} else {
			const newUser = await Users.add(userObj);
			console.log(newUser);
			const token = generateToken(newUser);
			console.log(token);
			res.status(201).json(token);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error authenticating user' });

		throw new Error(error);
	}
});

router.get('/slack/', authenticate, async (req, res, next) => {
	//console.log('got here?');
	const { subject, roles, teamId } = req.decodedJwt;
	const payload = qs.stringify({
		client_id: process.env.SLACK_CLIENT_ID,
		client_secret: process.env.SLACK_CLIENT_SECRET,
		code: req.query.code,
		redirect_uri: process.env.SLACK_REDIRECT_URI
	});
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	};
	//console.log('payload', payload);
	try {
		// Make Auth request with Slack
		const { data } = await axios.post(
			'https://slack.com/api/oauth.access',
			payload,
			headers
		);
		console.log('data', data);
		if (data.ok === false || data.user_id === null) {
			console.log('got here');
			return res.status(401).json({ message: 'Slack authentication error' });
		}
		// Query the users table for User resource
		const resource = await Users.findById(subject);
		//console.log('Check here', resource);
		// If resource slackToken === null, then build slackObj to update the user resource
		const slackObj = {
			slackToken: data.access_token,
			slackUserId: data.user_id,
			slackTeamId: data.team_id
		};
		console.log('slackObj', slackObj);
		if (resource.slackToken === null) {
			await Users.update(subject, slackObj);
			const user = { subject, roles, teamId, ...slackObj };
			console.log('user', user);
			const token = generateTokenSlack(user);
			return res.status(202).json({ token });
		} else {
			// If resource slackToken !== null, then create token Obj
			const user = { subject, roles, teamId, ...slackObj };
			console.log('user token null', user);
			const token = generateTokenSlack(user);
			return res.status(202).json({ token });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error authenticating user' });
		throw new Error(err);
	}
});

module.exports = router;
