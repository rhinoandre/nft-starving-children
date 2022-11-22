import { ethers } from 'ethers';
import { starvingChildrenAddress, tapAddress } from '../../config';
import starvingChildrenNFT from '../../blockchain/artifacts/blockchain/contracts/StarvingChildren.sol/StarvingChildren.json'
import tap from '../../blockchain/artifacts/blockchain/contracts/TAP.sol/TAP.json'

let signer;
function getSigner() {
    if (signer) return signer;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    return signer;
}

export function getNFTContract() {
    const signer = getSigner();
    return new ethers.Contract(
        starvingChildrenAddress,
        starvingChildrenNFT.abi,
        signer,
    );
}

export function getTAPContract() {
    const signer = getSigner();
    return new ethers.Contract(
        tapAddress,
        tap.abi,
        signer,
    );
}
