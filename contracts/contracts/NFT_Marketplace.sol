// SPDX - License-Identifier: MIT
pragma solidity ^0.8.4;

// Importing OpenZeppelin contracts
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

// Contract NFT_Marketplace
contract NFT_Marketplace is Ownable, IERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 public listingPrice = 0.0025 ether;

    address payable owner;

    // Mapping of token id to Item
    mapping(uint256 => Item) private idMarketItem; 

    struct Item {
        uint256 id,
        address payable owner,
        address payable seller,
        uint256 price,
        bool sold
    }

    modifer onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this contract");
        _; // continue execution
    }

    event MarketItemCreated (
        uint256 indexed tokenId, 
        address payable owner, 
        address payable seller, 
        uint256 price, 
        bool sold
    );

    constructor() ERC721("NFT Marketplace", "MYNFT") {
        owner = payable(msg.sender);
    }

    function updateListingPrice(unit256 _listingPrice) public payable onlyOwner {
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }
    
    function createToken(string memory _tokenURI, uint256 price) public payable returns (uint256) {
        _tokenIds.increment();
        _itemsSold.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price);

        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        idMarketItem[tokenId] = MarketItem({
            id: tokenId,
            owner: payable(msg.sender),
            seller: payable(address(this)),
            price: price,
            sold: false
        });

        _transfer(msg.sender, address(this), tokenId);
    }

    emit MarketItemCreated(tokenId, msg.sender, address(this), price, false);

    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(idMarketItem[tokenId].owner == msg.sender, "You are not the owner of this token");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].sold = false;

        _itemsSold.decrement();
        _transfer(msg.sender, address(this), tokenId);

        // emit MarketItemCreated(tokenId, msg.sender, address(this), price, false);
    }

    function createMarketSale(uint256 tokenId) public payable {
        unit256 price = idMarketItem[tokenId].price;

        require(idMarketItem[tokenId].owner == msg.sender, "You are not the owner of this token");  
        require(msg.value == price, "Price must be equal to listing price");

        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].owner = payable(address(0));

        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = itemCount - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory marketItems = new MarketItem[](unsoldItemCount);

        for(uint256 i = 0; i < itemCount; i++) {
            if(idMarketItem[i + 1].owner == address(this)) {
                uint256 currentId += 1;

                MarketItem storage currentItem = idMarketItem[currentId];

                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return marketItems;
    }

    function fetchMyNFT() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
    
        for(uint256 i = 0; i < totalCount; i++) {
            if(idMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }   
    
        MarketItem[] memory marketItems = new MarketItem[](itemCount);
    
        for(uint256 i = 0; i < totalCount; i++) {
            if(idMarketItem[i + 1].owner == msg.sender) {
                
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return marketItems;
    } 

    function fetchIemsListed() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for(uint256 i = 0; i < totalCount; i++) {
            if(idMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory marketItems = new MarketItem[](itemCount);

        for(uint256 i = 0; i < totalCount; i++) {
            if(idMarketItem[i + 1].seller == msg.sender) {

                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return marketItems;
    }
}