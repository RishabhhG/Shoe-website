const express = require('express'); // Import Express
const app = express(); // Initialize the Express app
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT; // Define the port
const connectDB = require('./config/db')
const authroute = require('./routes/authroute')
const cookieParser = require('cookie-parser');
app.use(cookieParser()); // Enable cookies in your application

app.use(cors());

 
app.use(express.json());

connectDB()

app.use("/api/auth" , authroute);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!'); // Send response
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
