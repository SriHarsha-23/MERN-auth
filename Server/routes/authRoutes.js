import express from 'express';
import {isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';   

const authRouter = express.Router(); 

authRouter.post('/register', register); // Register route End Point
authRouter.post('/login',login); // Login route End Point
authRouter.post('/logout', logout); // Logout route End Point
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated); // Check if user is authenticated
authRouter.post('/send-reset-otp',  sendResetOtp); // Send OTP for password reset
authRouter.post('/reset-password',  resetPassword); // Reset password route End Point

export default authRouter; // Exporting the authRouter to use in server.js