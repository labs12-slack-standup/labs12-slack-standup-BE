require('dotenv').config();
const server = require('./api/server.js');

server.listen(process.env.PORT || 4000).then(({ url }) =>
	console.log(`🚀 Server ready at ${url}`)
);
