const router = require('express').Router();
const sgMail = require('@sendgrid/mail');

//pull this from .env
sgMail.setApiKey(
	process.env.SENDGRID_API_KEY
);

router.post('/', async (req, res) => {
	try {
        console.log(req.body)
		const { emails, joinCode } = req.body;
		const msg = {
			to: emails,
			from: 'stand-em-up@lambdaschool.gov',
			subject: 'Welcome to Stand-Em-Up',
			text: `Join our Stand-Em-Up team. Go to https://stand-em-ups.netlify.com/onboarding, create a login, and enter your join code (${joinCode}) when prompted.`
		};
		await sgMail.send(msg);
		res.status(200).json({ message: 'Emails sent successfully' });
	} catch (error) {
		res.status(500).json({
			message: 'Sorry but something went wrong while sending the emails.'
		});
		throw new Error(error);
	}
});

module.exports = router;


