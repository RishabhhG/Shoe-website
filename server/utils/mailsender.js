const nodemailer = require("nodemailer");

const mailSender = async (email, title, body, attachment = null) => {
    try {
        
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        // Email options
        let mailOptions = {
            from: 'SNKRS | Rishabh',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        };

        // If there is an attachment, add it to the mail options
        if (attachment) {
            mailOptions.attachments = [
                {
                    filename: 'invoice.pdf',  // File name for the attached PDF
                    content: attachment,  // PDF buffer content
                    contentType: 'application/pdf'
                }
            ];
        }

        // Send the email
        let info = await transporter.sendMail(mailOptions);
        console.log(info);
        return info;

    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error;
    }
};

module.exports = mailSender;
