const router = require('express').Router();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');


router.post('/', (req, res) => {
    const { emails, joincode } = req.body
});

const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);



module.exports = router;