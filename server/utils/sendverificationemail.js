const mailSender = require('./mailsender')
const emailTemplate = require('./forgot-passwordemail')
async function sendVerificationEmail(email, verifyToken) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Forgot Password",
			emailTemplate(verifyToken)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

module.exports = sendVerificationEmail;