const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        default: "user",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    token_balance: {
        type: Number,
        default: 0
    },
    wallet_address: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('User', userSchema);