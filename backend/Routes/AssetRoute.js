const express = require('express');
const router = express.Router();
const AssetController = require('../Controllers/AssetController');

router.post('/', AssetController.createAsset);
router.get('/', AssetController.getAllAssets);
router.get('/:id', AssetController.getAssetById);
router.delete('/:id', AssetController.deleteAsset);

router.post('/buy/:id', AssetController.buyAsset);
router.post('/list/:id', AssetController.listAssetForSale);
router.post('/cancel-listing/:id', AssetController.cancelListing);

router.get('/user/:userId', AssetController.getAssetsByUser);
router.get('/for-sale', AssetController.getAssetsForSale);

module.exports = router;