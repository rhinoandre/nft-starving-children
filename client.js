import Nullstack from 'nullstack';

import Application from './src/Application';

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
async function sendFileToIPFS(fileImage) {
  try {
    const formData = new FormData();
    formData.append('file', fileImage);

    const reponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'post',
      body: formData,
      headers: {
        'pinata_api_key': `${context.settings.pinataApiKey}`,
        'pinata_secret_api_key': `${context.settings.pinataApiSecret}`
      },
    });
    const resFile = await reponse.json();

    const imgUrl = `https://gateway.pinata.cloud/ipfs/${resFile.IpfsHash}`;

    return imgUrl;
  } catch (error) {
    console.log('Error sending File to IPFS: ')
    console.error(error)
  }
}

context.start = async function start() {
  context.sendFileToIPFS = sendFileToIPFS;

  context.walletAddress = localStorage.getItem(WALLET_ADDRESS);
  context.logout = logout;
  context.login = login;
}

export default context;