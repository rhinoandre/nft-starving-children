//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/*
{
    name: '',
    image: 'Image URI',
    description: '',
    externalLink: '' // not sure if this needs to be here of the metadata
}
*/

contract DonationNFT is ERC721("StarvingChildren", "SC"),Ownable {
    // Receive an JSON instead of and URI
    function mint(address admAccount, string memory tokenURI) public onlyOwner {
        // store it on blockchain
    }

    // How do I know to whom to donate to? Will it be the children? An entity? 
    function donate(address child, address item) public {
        // Donate the token.
    }
}