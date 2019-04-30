require('dotenv').config();
const express = require('express');
const Sentry = require('@sentry/node');

const middleware = require('./middleware/config');
const authenticate = require('./middleware/authenticate');
const errorMiddleware = require('./middleware/errorReporting');

const authController = require('./controllers/auth');
const userController = require('./controllers/users');
const reportController = require('./controllers/reports');
const responseController = require('./controllers/responses');

// initializations
const server = express();
Sentry.init({
	dsn: process.env.SENTRY_DSN
});

// middleware
middleware(server);

// controllers
server.use('/api/auth', authController);
server.use('/api/users', userController);
server.use('/api/reports', reportController);
server.use('/api/responses', responseController);

// error reporting middleware (Must be after all requests)
errorMiddleware(server);

server.get('/', (req, res) => {
	res.status(200).json({ message: 'Sanity check' });
});

if (require.main == module) {
	server.listen(process.env.PORT, () => {
		console.log(
			`🚀 Server is running at http://localhost:${
				process.env.PORT
			}/`
		);
	});
} else {
	module.exports = server;
}
