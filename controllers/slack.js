const router = require('express').Router();
const axios = require('axios');
const qs = require('qs');

// const payload = qs.stringify({
//   client_id: process.env.SLACK_CLIENT_ID,
//   client_secret: process.env.SLACK_CLIENT_SECRET,
//   code: req.query.code,
//   redirect_uri: process.env.SLACK_REDIRECT_URI
// })


// This is the endpoint that returns the list of channels available for a user
// this endpoint is requested when a user wants to create a new reports, on ComponentDidMount.
router.get('/channels', async (req, res, next) => {
  try {
    // We need to construct a url with the users slackToken appended as a query param
    const token = req.decodedJwt.slackToken;
    const endpoint = `https://slack.com/api/conversations.list?token=${token}`;
    const { data } = await axios.get(endpoint);
    // If the response is successful and the data object contains a channels array extract the id and name properties and return as json
    if (data.channels) {
      const channels = data.channels.map(channel => ({
        id: channel.id,
        name: channel.name
      }));
      res.status(200).json(channels);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;