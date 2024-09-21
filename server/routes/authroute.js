const {Router} = require('express');

const {signup, login, logout, getuserinfo, forgotpassword, payment, resetpassword, auth0Callback} = require('../controller/authcontroller')
const verifyToken = require('../middleware/verifyToken')

const router = Router();
//router.get("/check-auth", verifyToken, checkAuth);
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.post('/payment',verifyToken, payment);

router.get("/user-info",verifyToken, getuserinfo);


router.post('/forgot-password', forgotpassword);
router.post('/reset-password/:token', resetpassword);
router.post('/auth0-callback', auth0Callback);

module.exports = router