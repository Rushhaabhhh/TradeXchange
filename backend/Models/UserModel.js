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
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    token_balance: {
        type: Number,
        default: 100
    },
    wallet_address: {
        type: String,
        default: ""
    },
    assets: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset'
    }]
});

module.exports = mongoose.model('User', userSchema);