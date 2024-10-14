const express = require('express');
const router = express.Router();
const AssetController = require('../Controllers/AssetController');

router.post('/', AssetController.createAsset);
router.get('/', AssetController.getAllAssets);
router.get('/:id', AssetController.getAssetById);
router.delete('/:id', AssetController.deleteAsset);

router.post('/buy/:id', AssetController.buyAsset);
router.post('/sell/:id', AssetController.sellAsset);

module.exports = router;
