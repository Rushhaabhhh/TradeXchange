const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../Models/UserModel');

// Login Controller
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        return res.json({
            message: "Login successful",
            success: true,
            token: token,
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to handle request", error: error.message });
    }
};

// Signup Controller
exports.signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            token: token,
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to handle request", error: error.message });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve users", error: error.message });
    }
};

// Get User by ID
exports.getUser = async (req, res) => {
    const userId = req.params.userId;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }
  
    try {
        const user = await User.findById(userId);
  
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Logout Controller
exports.logoutUser = (req, res) => {
    try {
        res.json({
            message: "Logout successful",
            success: true,
            token: null // You can also clear the token on the client side
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to handle request", error: error.message });
    }
};

// Update User DetailsController
exports.updateUserDetails = async (req, res) => {
    const userId = req.params.userId;
    const { username, email } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }
    try {
        const user = await User.findByIdAndUpdate(userId, { username, email });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
