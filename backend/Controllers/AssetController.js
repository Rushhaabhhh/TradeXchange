const Asset = require('../Models/AssetModel');
const User = require('../Models/UserModel');
const blockchainService = require('../Contracts/blockchain');

const walletAddress = '0xE16C3a29aA28c1B3DB5cF79f21550Ec244f5d00F';

exports.createAsset = async (req, res) => {
    const { title, description, price, userId, image } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const blockchainResult = await blockchainService.createAsset(title, price);

        const newAsset = new Asset({
            title,
            description,
            price,
            createdBy: userId,
            image,
            tokenId: blockchainResult.events.Transfer.returnValues.tokenId,
            owner: blockchainResult.from,
            transactionHash: blockchainResult.transactionHash
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
    const { userId } = req.body;
    try {
        const asset = await Asset.findById(req.params.id);
        const buyer = await User.findById(userId);
        if (!asset || !buyer) {
            return res.status(404).json({ message: 'Asset or User not found' });
        }

        const blockchainResult = await blockchainService.buyAsset(asset.tokenId, asset.price, buyer.walletAddress);

        asset.owner = buyer.walletAddress;
        asset.isForSale = false;
        asset.transactionHash = blockchainResult.transactionHash;
        await asset.save();

        res.json({ message: 'Asset purchased successfully', asset });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.listAssetForSale = async (req, res) => {
    const { price } = req.body;
    try {
        const asset = await Asset.findById(req.params.id);
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        const blockchainResult = await blockchainService.listAssetForSale(asset.tokenId, price, asset.owner);

        asset.price = price;
        asset.isForSale = true;
        asset.transactionHash = blockchainResult.transactionHash;
        await asset.save();

        res.json({ message: 'Asset listed for sale', asset });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.cancelListing = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        // Implement blockchain cancellation here
        // const blockchainResult = await blockchainService.cancelListing(asset.tokenId, asset.owner);

        asset.isForSale = false;
        // asset.transactionHash = blockchainResult.transactionHash;
        await asset.save();

        res.json({ message: 'Asset listing cancelled', asset });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAssetsByUser = async (req, res) => {
    try {
        const assets = await Asset.find({ createdBy: req.params.userId });
        res.json(assets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAssetsForSale = async (req, res) => {
    try {
        const assets = await Asset.find({ isForSale: true });
        res.json(assets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};