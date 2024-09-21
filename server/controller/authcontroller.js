const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generateJWTtoken = require('../utils/jwt_cookie');
const crypto = require('crypto')
const otpGenerator = require('otp-generator')
const axios = require('axios');
const stripe = require('stripe')('sk_test_51Q0qtqRqbkdUqBRj4OJpHTy3tZkOoDuE3AtgdJh4kMOqJbouh3gpGVDvsZF3zNEHTm6l3Uk7vRFIcvtLXTBp9pcr007U0lKNJL');
const sendVerificationEmail = require('../utils/sendverificationemail')
const invoiceSender = require('../utils/invoicesender')
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { email, password, name, recaptchaToken } = req.body;

        // Check if all fields are provided
        if (!email || !password || !name || !recaptchaToken) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Verify reCAPTCHA token
        const recaptchaResult = await verifyRecaptchaToken(recaptchaToken);
        if (!recaptchaResult.success) {
            return res.status(400).json({ message: 'Invalid reCAPTCHA token' });
        }

        // Check if user already exists
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ message: 'User already exists with this email. Try login!' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a verification token
        const verifyToken = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false }).toString();

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken: verifyToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Token valid for 24 hours
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token and set it in a cookie
        generateJWTtoken(res, newUser._id);

        // Respond with success
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            user: {
                ...newUser._doc,
                password: undefined // Remove password from the response
            },
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'User cannot be created',
            error: error.message
        });
    }
};

async function verifyRecaptchaToken(token) {
    const secret = process.env.RECAPTCHA_SECRET_KEY; // Use your secret key from the .env file
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        return { success: false };
    }
}

exports.login = async (req, res) => {
    const { email, password, captchaValue } = req.body;

    // Verify the reCAPTCHA token first
    const recaptchaResponse = await verifyRecaptchaToken(captchaValue);

    if (!recaptchaResponse.success) {
        return res.status(400).json({
            success: false,
            message: "reCAPTCHA verification failed. Please try again.",
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist, please check the email and password",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password, please check it again",
            });
        }

        // Generate the JWT token after successful login
        const token = generateJWTtoken(res, user._id);
        user.lastLogin = Date.now();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                email: user.email,
                lastLogin: user.lastLogin,
                token:token
            },
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: "Unable to login",
        });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success : true,
        message : 'logout successfull'
    })
};

exports.getuserinfo = async (req, res) => {
    try {
        const userData = await User.findById(req.userID);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User with given ID not found"
            });
        }

        // Only send this response if userData is found
        return res.status(200).json({
            success: true,
            message: "Login successful",
            id: userData.id,
            email: userData.email,
            name: userData.name,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot sign in, please check Email and Password"
        });
    }
};


exports.forgotpassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            // No user found with this email, return a 404 response
            return res.status(404).json({
                success: false,
                message: "No account found with this email address",
            });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // Token valid for 1 hour

        // Save the user with the token
        await user.save();

        // Send the email with the reset link
        try {
            await sendVerificationEmail(user.email, `http://localhost:5173/reset-password/${resetToken}`);
            console.log("Email sent");

            // Send success response after email is sent
            return res.status(200).json({
                success: true,
                message: 'Reset password email sent successfully',
            });

        } catch (error) {
            console.log("Error in email sending: ", error);
            return res.status(500).json({
                success: false,
                message: "Error in sending verification email",
            });
        }

    } catch (error) {
        console.error("Forgot password error: ", error);
        return res.status(400).json({
            success: false,
            message: "There was an error processing your request",
        });
    }
};


exports.payment = async (req, res) => {
    try {
      const {fullName, email,address, productName, priceAmount } = req.body;  // Extract data from request
      
      // Create or reuse a product
      const product = await stripe.products.create({
        name: productName || "NIKE DUNK HIGH RETRO",  // Default to a product name if not provided
      });
  
      if (!product) {
        return res.status(400).json({ message: 'Failed to create product' });
      }
  
      // Create a price for the product
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: (priceAmount || 300) * 100,  // Amount in paise (INR) or fallback to ₹300
        currency: 'inr',
      });
  
      if (!price.id) {
        return res.status(400).json({ message: 'Failed to create price' });
      }
  
      // Create a Checkout Session
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
        customer_email: email || 'demo@gmail.com',  // Fallback email
      });
  
      // Send invoice via email after successful payment session creation
      const clientName = fullName || "John doe";  // Replace with actual client data if available
      const clientAddress = address ||'1234 Elm Street, City, Country';  // Replace with real client address
      const priceValue = priceAmount || 300;  // Default price if not provided
  
      // Sending the invoice to the user's email
      await invoiceSender(email, clientName, clientAddress, productName, priceValue);
  
      // Return session details to the client
      return res.status(200).json(session);
  
    } catch (error) {
      console.error('Error in payment:', error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


exports.resetpassword = async(req,res)=>{
    try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
}

exports.checkAuth = async(req,res)=>{
    try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
}

exports.auth0Callback = async (req, res) => {
    try {
      const { user: auth0User } = req.body;
      let user = await User.findOne({ email: auth0User.email });
      if (!user) {
        user = new User({
          name: auth0User.name,
          email: auth0User.email,
          //auth0Id: auth0User.sub,
        });
      } else {
        user.auth0Id = auth0User.sub;
      }
      user.lastLogin = Date.now();
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token)
      res.json({
        success: true,
        message: "Auth0 login successful",
        user: { id: user._id, name: user.name, email: user.email,token:token }, 
        
      });
    } catch (error) {
      console.error("Error during Auth0 callback:", error);
      res.status(500).json({
        success: false,
        message: "Unable to process Auth0 login",
        error: error.message
      });
    }
  };
