const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const moment = require('moment');
const { generateToken } = require('../helpers/generateToken');
const admin = require('firebase-admin');

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
			message:
				'Sorry but something went wrong while registering',
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
			message:
				'Sorry but something went wrong while logging in'
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
	auth_provider_x509_cert_url:
		'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url: process.env.CLIENT_URL
};

admin.initializeApp({ credential: admin.credential.cert(config) });

router.post('/firebase', async ({ body }, res) => {
	// deconstruct access token
	const { accessToken } = body.stsTokenManager;
	try {
		// verify access token with Firebase admin.
		const {
			email,
			name: fullName,
			picture: profilePic
		} = await admin.auth().verifyIdToken(accessToken);
		// desconstructed variables form the userObj to be inserted into Users Model
		const userObj = {
			email,
			fullName,
			roles: 'member',
			profilePic,
			created_at: moment().format()
		};

		// First we check if the email belongs to an exisitng user
		const [existingUser] = await Users.findBy({ email });
		// If true we generate a token and return it back to the client
		if (existingUser) {
			const token = await generateToken(existingUser);
			return res.status(201).json(token);
			// If false we add the userObj to the User Model, generate a token and return it back to the client
		} else {
			const newUser = await Users.add(userObj);
			const token = await generateToken(newUser);
			return res.status(201).json(token);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error authenticating user' });
	}
});

module.exports = router;
