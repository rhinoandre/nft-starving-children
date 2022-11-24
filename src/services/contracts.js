import { ethers } from 'ethers';
import { starvingChildrenAddress, tapAddress } from '../../config';
import starvingChildrenNFT from '../../blockchain/artifacts/blockchain/contracts/StarvingChildren.sol/StarvingChildren.json'
import tap from '../../blockchain/artifacts/blockchain/contracts/TAP.sol/TAP.json'

let provider;
let signer;
export function getProviderAndSigner(providerUrl) {
    if (signer && provider) return { provider, signer };

    provider = new ethers.providers.JsonRpcProvider(providerUrl);
    signer = provider.getSigner();
    return { provider, signer };
}

export function getNFTContract(providerUrl) {
    return () => {
        const { signer } = getProviderAndSigner(providerUrl);
        return new ethers.Contract(
            starvingChildrenAddress,
            starvingChildrenNFT.abi,
            signer,
        );
    }
}

export function getTAPContract(providerUrl) {
    return () => {
        const { signer } = getProviderAndSigner(providerUrl);
        return new ethers.Contract(
            tapAddress,
            tap.abi,
            signer,
        );
    }
}
