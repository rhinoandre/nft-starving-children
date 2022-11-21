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

    mapping(uint256 => ChildNFT) private childNFTs;

    struct ChildNFT {
        uint256 tokenId;
        address payable owner;
    }

    event ItemCreated(uint256 indexed tokenId);

    constructor() ERC721('StarvingChildren', 'SC') {}

    function createNFT(
        string memory tokenURI,
        uint256 price
    ) public onlyOwner returns (uint256) {
        require(price > 0, 'Price must be at least 1 wei');
        uint256 tokenId = _createToken(tokenURI);

        childNFTs[tokenId] = ChildNFT(tokenId, payable(owner()));
        emit ItemCreated(tokenId);

        return tokenId;
    }

    function _createToken(string memory tokenURI) private returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(owner(), newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }

    function getToken(uint id) public view returns (ChildNFT memory){
      return childNFTs[id];
    }
}
