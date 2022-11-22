import Nullstack from 'nullstack';

import Application from './src/Application';
import { getNFTContract, getTAPContract } from './src/services/contracts';
import { tapAddress } from './config';

const context = Nullstack.start(Application);

const WALLET_ADDRESS = 'walletAddress'
function logout() {
  localStorage.removeItem(WALLET_ADDRESS);
  context.walletAddress = undefined;
}

function login(walletAddress) {
  localStorage.setItem(WALLET_ADDRESS, walletAddress);
  context.walletAddress = walletAddress;
}

const headers = {
  'pinata_api_key': `${context.settings.pinataApiKey}`,
  'pinata_secret_api_key': `${context.settings.pinataApiSecret}`
}
async function sendFileToIPFS(fileImage) {
  try {
    const formData = new FormData();
    formData.append('file', fileImage);

    const reponse = await fetch(`${context.settings.pinataApi}/pinFileToIPFS`, {
      method: 'post',
      body: formData,
      headers,
    });
    const resFile = await reponse.json();

    const imgUrl = `https://gateway.pinata.cloud/ipfs/${resFile.IpfsHash}`;

    return imgUrl;
  } catch (error) {
    console.log('Error sending File to IPFS: ')
    console.error(error)
  }
}

async function sendJSONToIPFS({ name, description, fileUrl, externalLink }) {
  try {
    const reponse = await fetch(`${context.settings.pinataApi}/pinJsonToIPFS`, {
      method: 'post',
      body: JSON.stringify({
        name,
        description,
        externalLink,
        image: fileUrl
      }),
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    });
    const resFile = await reponse.json();

    const tokenURI = resFile.IpfsHash;
    return tokenURI;
  } catch (error) {
    console.log('Error sending File to IPFS: ')
    console.error(error)
  }
}

context.start = async function start() {
  context.getNFTContract = getNFTContract;
  context.getTAPContract = getTAPContract;

  context.tapContractAddress = tapAddress;

  context.sendFileToIPFS = sendFileToIPFS;
  context.sendJSONToIPFS = sendJSONToIPFS;

  context.walletAddress = localStorage.getItem(WALLET_ADDRESS);
  context.logout = logout;
  context.login = login;
}

export default context;