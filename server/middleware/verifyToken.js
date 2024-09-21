const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader)
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    // First, try to verify as a custom JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (!err) {
        req.user = decoded;
        return next();
      }

      // If custom JWT verification fails, try Auth0 token verification
      const client = jwksRsa({
        jwksUri: `dev-hymqkiipt1aejssi.us.auth0.com`
      });

      const getKey = (header, callback) => {
        client.getSigningKey(header.kid, (err, key) => {
          const signingKey = key.publicKey || key.rsaPublicKey;
          callback(null, signingKey);
        });
      };

      jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
          return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        req.user = decoded;
        next();
      });
    });
  } catch (error) {
    console.error('Error in verifyToken:', error);
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

module.exports = verifyToken;
