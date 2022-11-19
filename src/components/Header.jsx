import Nullstack from 'nullstack';
import Icon from './Icon';
import { ethers } from 'ethers';

class Header extends Nullstack {
  provider;

  prepare() {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
  }

  async clickTest() {
    // MetaMask requires requesting permission to connect users accounts
    await this.provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = this.provider.getSigner()
  }

  render() {
    return (
      <header>
        <div class="">
          <p>NFTS FOR</p>
          <p>STARVING CHILDREN</p>
        </div>

        <div>
          <div class="flex">
            <Icon type="tap" />
            <div>
              <p>1.345 TAP</p>
              <span class="font-light">0x5fgd...g65df</span>
            </div>
          </div>
          <div class="flex gap-2 font-bold">
            <a class="cursor-pointer" onclick={this.clickTest}><Icon type="account" /> My account</a>
          </div>
        </div>
        <div>
          <a href='/'>Home</a>
          <a href='/wtf'>WFT?</a>
          <a href='/explore'>Explore</a>
          <a href='/taps'>TAPS</a>
        </div>
      </header>
    )
  }
}

export default Header;