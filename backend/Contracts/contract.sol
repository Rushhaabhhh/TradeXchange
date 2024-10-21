// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DigitalAssetMarketplace is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Asset {
        uint256 id;
        address creator;
        uint256 price;
        bool isForSale;
    }

    mapping(uint256 => Asset) public assets;

    event AssetListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event AssetSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);

    constructor() 
        ERC721("DigitalAsset", "DA")  
        Ownable(msg.sender) { }     


    function createAsset(string memory tokenURI, uint256 price) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        assets[newItemId] = Asset(newItemId, msg.sender, price, true);
        
        emit AssetListed(newItemId, msg.sender, price);
        
        return newItemId;
    }

    function buyAsset(uint256 tokenId) public payable {
        Asset storage asset = assets[tokenId];
        require(asset.isForSale, "Asset is not for sale");
        require(msg.value >= asset.price, "Insufficient payment");
        
        address seller = ownerOf(tokenId);
        
        _transfer(seller, msg.sender, tokenId);
        payable(seller).transfer(msg.value);
        
        asset.isForSale = false;
        
        emit AssetSold(tokenId, seller, msg.sender, msg.value);
    }

    function listAssetForSale(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        
        assets[tokenId].price = price;
        assets[tokenId].isForSale = true;
        
        emit AssetListed(tokenId, msg.sender, price);
    }

    function cancelListing(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        
        assets[tokenId].isForSale = false;
    }
}