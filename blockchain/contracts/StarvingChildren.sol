// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

import 'hardhat/console.sol';

contract StarvingChildren is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    mapping(uint256 => ChildNFT) private childNFTs;

    struct ChildNFT {
        uint256 childTokenId;
        uint256 donationTokenId;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event ItemCreated(uint256 indexed childTokenId, uint256 donationTokenId, address owner, uint256 price);

    constructor() ERC721('StarvingChildren', 'SC') {}

    function createNFTs(
        string memory childURI,
        string memory donationURI,
        uint256 price
    ) public onlyOwner returns (uint256) {
        uint256 donationTokenId = _createToken(donationURI);

        uint256 childTokenId = _createToken(childURI);
        _addChildNFTToMarket(childTokenId, donationTokenId, price);

        return childTokenId;
    }

    function _createToken(string memory tokenURI) private returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(owner(), newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }

    function _addChildNFTToMarket(
        uint256 childTokenId,
        uint256 donationTokenId,
        uint256 price
    ) private {
        require(price > 0, 'Price must be at least 1 wei');

        childNFTs[childTokenId] = ChildNFT(childTokenId, donationTokenId, payable(owner()), price, false);

        emit ItemCreated(childTokenId, donationTokenId, address(this), price);
    }

    function getToken(uint id) public view returns (ChildNFT memory){
      return childNFTs[id];
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function purchaseChildNFT(uint256 tokenId) public payable {
        ChildNFT memory child = childNFTs[tokenId];
        // child.owner = payable(msg.sender);
        child.sold = true;
        _itemsSold.increment();
        payable(owner()).transfer(child.price);
        _transfer(address(this), msg.sender, tokenId);
    }

    /* Returns all unsold market items */
    /*function fetchMarketItems() public view returns (ChildNFT[] memory) {
        uint256 itemCount = _childNFTIds.current();
        uint256 unsoldItemCount = _childNFTIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        ChildNFT[] memory items = new ChildNFT[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (childNFTs[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                ChildNFT storage currentItem = childNFTs[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }*/

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (ChildNFT[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (childNFTs[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        // I could remove the previous loop if I stop instanciating the Item with a size
        // would it be fine? #Mortaro
        ChildNFT[] memory items = new ChildNFT[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (childNFTs[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                ChildNFT storage currentItem = childNFTs[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
