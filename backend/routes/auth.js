const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();
var fetchuser = require('../middleware/fetchuser');


//ROUTE 1:Create a user using POST: "api/auth/createuser" // No login required
router.post('/createuser',
    [body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
    ], async (req, res) => {
        try {
            //If there are errors,return Bad request and the errors:
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, error: errors.array() });
            }

            //Check weather the user with this email exists already 
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success: false, error: "Sorry a user with this email already exists" });
            }

            //Create a new Password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //Create a new user:
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            });

            const data = {
                user: {
                    id: user.id
                }
            }

            const Authtoken = jwt.sign(data, process.env.JWT_SECRET);
            res.json({ success: true, Authtoken });
        }
        catch (error) {
            console.error('Create user error:', error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    });

//ROUTE 2:Authenticate a user using POST: "api/auth/login" // No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    try {
        //If there are errors,return Bad request and the errors:
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array() });
        }

        const { email, password } = req.body;
        let user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ 
                success: false, 
                error: "Please login with correct credentials" 
            });
        }

        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return res.status(400).json({ 
                success: false, 
                error: "Please login with correct credentials" 
            });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const Authtoken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ success: true, Authtoken });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

//ROUTE 3:Get loggedin user details using POST: "api/auth/getuser" // login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select('-password');
        res.json({ success: true, user });
    }
    catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;