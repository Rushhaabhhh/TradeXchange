const { Web3 } = require('web3');
const contractABI = require('./contractABI.json');
const contractAddress = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8'; // Replace with your deployed contract address

// Create a Web3 instance
const web3 = new Web3('https://sepolia.infura.io/v3/YOUR-PROJECT-ID'); // Replace with your Infura project ID or use another provider

// Create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function createAsset(tokenURI, price, fromAddress) {
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await contract.methods.createAsset(tokenURI, price).estimateGas({ from: fromAddress });
    
    return contract.methods.createAsset(tokenURI, price).send({
        from: fromAddress,
        gas,
        gasPrice
    });
}

async function buyAsset(tokenId, price, fromAddress) {
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await contract.methods.buyAsset(tokenId).estimateGas({ from: fromAddress, value: price });
    
    return contract.methods.buyAsset(tokenId).send({
        from: fromAddress,
        gas,
        gasPrice,
        value: price
    });
}

async function listAssetForSale(tokenId, price, fromAddress) {
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await contract.methods.listAssetForSale(tokenId, price).estimateGas({ from: fromAddress });
    
    return contract.methods.listAssetForSale(tokenId, price).send({
        from: fromAddress,
        gas,
        gasPrice
    });
}

module.exports = {
    createAsset,
    buyAsset,
    listAssetForSale
};