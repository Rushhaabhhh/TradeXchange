const User = require('../Models/UserModel');
const Asset = require('../Models/AssetModel');

exports.createAsset = async (req, res) => {
    const { title, description, price, userId } = req.body;

    try {
        const newAsset = new Asset({
            title,
            description,
            price,
            createdBy : userId, 
        });

        const savedAsset = await newAsset.save();
        res.status(201).json(savedAsset);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.find();
        res.json(assets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAssetById = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        res.json(asset);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        res.json(asset);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndDelete(req.params.id);
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        res.json({ message: 'Asset deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.buyAsset = async (req, res) => {
    const userId = req.body.userId; 
    try {
        const asset = await Asset.findById(req.params.id);
        const user = await User.findById(userId);

        if (!asset || !user) {
            return res.status(404).json({ message: 'Asset or User not found' });
        }

        if (user.token_balance < asset.price) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Deduct price from user's balance and add asset to user's assets
        user.token_balance -= asset.price;
        user.assets.push(asset._id);
        await user.save();

        res.status(200).json({ message: 'Asset purchased successfully', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.sellAsset = async (req, res) => {
    const userId = req.body.userId; 
    try {
        const asset = await Asset.findById(req.params.id);
        const user = await User.findById(userId);

        if (!asset || !user) {
            return res.status(404).json({ message: 'Asset or User not found' });
        }

        if (!user.assets.includes(asset._id)) {
            return res.status(400).json({ message: 'User does not own this asset' });
        }

        // Add price back to user's balance and remove asset from user's assets
        user.token_balance += asset.price;
        user.assets = user.assets.filter(a => a.toString() !== asset._id.toString());
        await user.save();

        res.status(200).json({ message: 'Asset sold successfully', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
