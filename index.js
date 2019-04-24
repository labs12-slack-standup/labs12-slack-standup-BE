require('dotenv').config();
const server = require('./api/server.js');

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
