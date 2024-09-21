const mailSender = require('./mailsender');  // Assuming this is a module for sending emails
const generateAndUploadInvoice = require('./pdf'); // Assuming this is the module with your invoice generator

async function invoiceSender(email, clientName, clientAddress, productName, price) {
  if (!email) {
    throw new Error('No email address provided');
  }

  try {
    // Generate and upload invoice to Cloudinary
    const { pdfBuffer, invoiceUrl } = await generateAndUploadInvoice(clientName, clientAddress, productName, price);
    
    if (!invoiceUrl) {
      throw new Error('Failed to upload invoice to Cloudinary');
    }

    // Define the email content
    const emailContent = `
      Hi ${clientName},
      <br><br>
      Thank you for your purchase! Attached is your invoice for the product ${productName}.
      <br><br>
      You can also download your invoice using the link below:
      <br>
      <a href="${invoiceUrl}">Download Invoice</a>
      <br><br>
      Thanks for shopping with us!
    `;

    // Send the email with the invoice link and PDF attachment
    const mailResponse = await mailSender(
      email, 
      "Your Invoice", 
      emailContent,
      pdfBuffer  // Ensure this is passed to attach the PDF invoice
    );
    
    if (!mailResponse || !mailResponse.response) {
      throw new Error('Failed to send the email');
    }

    console.log("Invoice email sent successfully: ", mailResponse.response);
    return mailResponse;
    
  } catch (error) {
    console.error("Error occurred while sending invoice email: ", error);
    throw error;
  }
}

module.exports = invoiceSender;
