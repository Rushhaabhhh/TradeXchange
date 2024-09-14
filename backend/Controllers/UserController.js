const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../Models/UserModel');    

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) {
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
        } 
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User({
                email,
                password: hashedPassword,
            });

            await user.save();

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

            return res.status(201).json({
                message: "User created and logged in successfully",
                success: true,
                token: token,
                userId: user._id
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Unable to handle request", error: error.message });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve users", error: error.message });
    }
};

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
        console.error(error); 
        res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
