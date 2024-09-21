const PDFDocument = require('pdfkit');
const cloudinary = require('cloudinary').v2;
const stream = require('stream');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

function generateAndUploadInvoice(clientName, clientAddress, productName, price) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    // Collect PDF data in memory
    doc.on('data', buffer => buffers.push(buffer));

    // Business Information
    doc.fontSize(20).text('SNKRS', { align: 'center' });
    doc.fontSize(10).text('123 Business Street', { align: 'center' });
    doc.text('Delhi, Delhi 12345', { align: 'center' });
    doc.text('Phone: 8851925784', { align: 'center' });
    doc.text('Email: rishabhh0807@gmail.com', { align: 'center' });

    doc.moveDown();

    // Client Information
    doc.fontSize(14).text('Bill To:');
    doc.fontSize(10).text(clientName);
    doc.text(clientAddress);

    doc.moveDown();

    // Invoice Details
    const invoiceNumber = new Date().getTime();
    const invoiceDate = new Date().toLocaleDateString();
    doc.text(`Invoice No: ${invoiceNumber}`);
    doc.text(`Date: ${invoiceDate}`);

    doc.moveDown();

    // Invoice Table
    const table = {
      headers: ['Description', 'Quantity', 'Unit Price', 'Amount'],
      rows: [
        [productName, '1', `Rs. ${price}`, `Rs. ${price}`]
      ]
    };

    const tableTop = 250;
    const tableLeft = 50;
    const tableWidth = 500;
    const cellPadding = 5;
    const cellWidth = tableWidth / 4;
    const cellHeight = 30;

    // Draw table headers
    doc.font('Helvetica-Bold');
    table.headers.forEach((header, i) => {
      doc.text(header, tableLeft + (i * cellWidth), tableTop, {
        width: cellWidth,
        align: 'center'
      });
    });

    // Draw table rows
    doc.font('Helvetica');
    table.rows.forEach((row, i) => {
      const rowTop = tableTop + cellHeight + (i * cellHeight);
      row.forEach((cell, j) => {
        doc.text(cell, tableLeft + (j * cellWidth), rowTop + cellPadding, {
          width: cellWidth,
          align: 'center'
        });
      });
    });

    // Draw table lines
    doc.moveTo(tableLeft, tableTop)
       .lineTo(tableLeft + tableWidth, tableTop)
       .stroke();

    doc.moveTo(tableLeft, tableTop + cellHeight)
       .lineTo(tableLeft + tableWidth, tableTop + cellHeight)
       .stroke();

    doc.moveTo(tableLeft, tableTop + (2 * cellHeight))
       .lineTo(tableLeft + tableWidth, tableTop + (2 * cellHeight))
       .stroke();

    for (let i = 0; i <= 4; i++) {
      doc.moveTo(tableLeft + (i * cellWidth), tableTop)
         .lineTo(tableLeft + (i * cellWidth), tableTop + (2 * cellHeight))
         .stroke();
    }

    // Total
    doc.text(`Total: Rs. ${price}`, tableLeft + (3 * cellWidth), tableTop + (2 * cellHeight) + cellPadding, {
      width: cellWidth,
      align: 'center'
    });

    // Footer
    doc.fontSize(10).text('Thank you for your business!', 50, 700, { align: 'center' });

    // Finalize the PDF
    doc.end();

    // When PDF generation is complete
    doc.on('end', () => {
      // Create a readable stream from the PDF buffer
      const pdfBuffer = Buffer.concat(buffers);

      // Upload to Cloudinary
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          public_id: `invoice_${invoiceNumber}`,
          folder: 'invoices'
        },
        (error, result) => {
          if (error) {
            console.error('Error uploading to Cloudinary:', error);
            reject(error);
          } else {
            console.log('PDF uploaded to Cloudinary:', result.secure_url);
            // Resolve with both the PDF buffer and the Cloudinary URL
            resolve({ pdfBuffer, invoiceUrl: result.secure_url });
          }
        }
      );

      // Pipe the PDF stream to Cloudinary
      const pdfStream = new stream.PassThrough();
      pdfStream.end(pdfBuffer);
      pdfStream.pipe(cloudinaryStream);
    });
  });
}

module.exports = generateAndUploadInvoice;
