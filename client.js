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

context.start = async function start() {
  context.walletAddress = localStorage.getItem(WALLET_ADDRESS);
  context.logout = logout;
  context.login = login;
}

export default context;