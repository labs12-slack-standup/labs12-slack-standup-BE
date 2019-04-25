require('dotenv').config();
const express = require('express');
const Sentry = require('@sentry/node');

const middleware = require('./middleware/config');
const authenticate = require('./middleware/authenticate');
const errorMiddleware = require('./middleware/errorReporting');

// initializations
const server = express();
Sentry.init({
	dsn: process.env.SENTRY_DSN
});

// Put Controllers here

// middleware
middleware(server);

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
