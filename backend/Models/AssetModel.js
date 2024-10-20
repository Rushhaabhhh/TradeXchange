const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        required: false,
    },
    tokenId: {
        type: Number,
        required: true,
        unique: true,
    },
    isForSale: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: String,
        required: true,
    },
    transactionHash: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Asset', assetSchema);