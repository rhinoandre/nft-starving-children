// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

import 'hardhat/console.sol';

contract StarvingChildren is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _templateIds;
    Counters.Counter private _tokenIds;

    mapping(uint256 => Token) private nftTemplates;

    struct Token {
        uint templateId;
        string childURI;
        string donationURI;
        uint price;
    }

    event TemplateCreated(uint indexed tokenId, string childURI, string donationURI, uint price);
    event TokenSold(uint indexed templateId, uint childId, uint donationId, uint price);

    constructor() ERC721('StarvingChildren', 'SC') {}

    function createTemplate(
        string memory childURI,
        string memory donationURI,
        uint price
    ) public onlyOwner {
        require(price > 0, 'Price must be at least 1 wei');
        _templateIds.increment();
        uint templateId = _templateIds.current();

        nftTemplates[templateId] = Token(templateId, childURI, donationURI, price);
        emit TemplateCreated(templateId, childURI, donationURI, price);
    }

    function _createToken(address owner, string memory tokenURI) private returns (uint256) {
        _tokenIds.increment();
        uint tokenId = _tokenIds.current();

        _mint(owner, tokenId);
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }

    function mintNFT(uint templateId) public onlyOwner payable {
        Token memory token = getTemplate(templateId);

        // mint token to their owner
        uint childId = _createToken(msg.sender, token.childURI);
        uint donationId = _createToken(owner(), token.donationURI);

        payable(owner()).transfer(token.price);
        emit TokenSold(templateId, childId, donationId, token.price);
    }

    function getTemplate(uint id) public view returns (Token memory){
      return nftTemplates[id];
    }
}
