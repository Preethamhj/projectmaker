// auth/auth.js
const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const jwt =require('jsonwebtoken');

const generateToken = (user) => {


    return jwt.sign({
        id: user._id, email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const user = await User.findOne({ email: email })
     if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    // Here you would typically check the user credentials against the database
    if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate a token for the user
    const token = generateToken(user);

    res.status(200).json({ message: 'Login successful', email, password }, { token });
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Invalid credentials provided' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
    // Here you would typically save the user to the database
    const newUser = new User({ name, email, password });
    await newUser.save();
    console.log("user  created successfully");

    const token = generateToken(newUser);

    res.status(200).json({ message: 'Registration successful', name, email, password }, { token });
});

module.exports = router;
