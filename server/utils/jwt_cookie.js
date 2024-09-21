const jwt = require('jsonwebtoken');

// Generate JWT token, return it, and set it in cookies
const generateJWTtoken = (res, userId) => {
    // Create the token with user ID as the payload
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token expires in 1 day
    });

    // Set token in a cookie
    

    // Return the token in the response (optional)
    return token;
};

module.exports = generateJWTtoken;
