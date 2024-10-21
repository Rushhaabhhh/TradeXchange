const {Web3} = require('web3');
const contractABI = require('./contractABI.json');
const contractAddress = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8'; 

const web3 = new Web3('https://sepolia.infura.io/v3/96a5eaee541f4b9ba92d115040b83a53');

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getAccount() {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];  // Use the first account
}

exports.createAsset = async (title, price) => {
    const tokenURI = `https://example.com/metadata/${title}`; // Replace with your metadata URI
    const priceInWei = web3.utils.toWei(price.toString(), 'ether');
    const fromAddress = await getAccount();

    const gasEstimate = await contract.methods.createAsset(tokenURI, priceInWei).estimateGas({ from: fromAddress });

    const result = await contract.methods.createAsset(tokenURI, priceInWei).send({
        from: fromAddress,
        gas: gasEstimate,
    });

    return result;
};

exports.buyAsset = async (tokenId, price) => {
    const priceInWei = web3.utils.toWei(price.toString(), 'ether');
    const fromAddress = await getAccount();

    const gasEstimate = await contract.methods.buyAsset(tokenId).estimateGas({ from: fromAddress, value: priceInWei });

    const result = await contract.methods.buyAsset(tokenId).send({
        from: fromAddress,
        value: priceInWei,
        gas: gasEstimate,
    });

    return result;
};

exports.listAssetForSale = async (tokenId, price) => {
    const priceInWei = web3.utils.toWei(price.toString(), 'ether');
    const fromAddress = await getAccount();

    const gasEstimate = await contract.methods.listAssetForSale(tokenId, priceInWei).estimateGas({ from: fromAddress });

    const result = await contract.methods.listAssetForSale(tokenId, priceInWei).send({
        from: fromAddress,
        gas: gasEstimate,
    });

    return result;
};

exports.cancelListing = async (tokenId) => {
    const fromAddress = await getAccount();

    const gasEstimate = await contract.methods.cancelListing(tokenId).estimateGas({ from: fromAddress });

    const result = await contract.methods.cancelListing(tokenId).send({
        from: fromAddress,
        gas: gasEstimate,
    });

    return result;
};