import Nullstack from 'nullstack';
import addressShortener from '../helpers/addressShortener';
import Icon from '../components/Icon';
import NftSlogan from './Logo';
import { ethers } from 'ethers'

class Header extends Nullstack {
  currentRouterStyle({ router, linkHref }) {
    if (router.url === linkHref) {
      return 'border-b-2 border-mustard';
    }
  }

  static async isAdminAccount({ isAdminAccount, request }) {
    const body = JSON.parse(request.body)
    return isAdminAccount(body.walletAddress);
  }

 async connectWallet({ router, walletAddress, login }) {
    if (walletAddress && await this.isAdminAccount({ walletAddress })) {
      router.url = '/admin';
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      login(walletAddress);
      if(await this.isAdminAccount({ walletAddress })) {
        router.url = '/admin';
      }
    } catch (error) {
      console.error('Connection to wallet refused!', error);
    }
  }

  renderLogout({ logout }) {
    return (
      <div class="flex items-center">
        <Icon type="account" />{' '}
        <span class="ml-2">
          <a class="cursor-pointer" onclick={logout}>
            Logout
          </a>
        </span>
      </div>
    )
  }

  renderMyAccount({ walletAddress }) {
    return (
      <div class="flex justify-end gap-4 pt-3">
        {walletAddress && (<>
          <div class="flex items-center gap-2">
            <Icon type="tap" />
            <div>
              <div class="">
                <span class="font-extrabold">1.345</span> <span>TAP</span>
              </div>
              <span class="text-xs text-gray-300" title={walletAddress}>
                {addressShortener({ address: walletAddress })}
              </span>
            </div>
          </div>
          <Logout />
        </>)}
        {!walletAddress && (<div class="flex items-center">
          <Icon type="account" />{' '}
          <span class="ml-2">
            <a class="cursor-pointer" onclick={this.connectWallet}>
              My Account
            </a>
          </span>
        </div>)}
      </div>
    );
  }

  render() {
    return (
      <div>
        <MyAccount />
        <div class="flex items-center justify-between p-6">
          <NftSlogan />
          <nav>
            <div class="mt-4 flex justify-end text-white">
              <a
                class={`mr-6 ${this.currentRouterStyle({ linkHref: '/' })}`}
                href="/"
              >
                Home
              </a>
              <a
                class={`mr-6 ${this.currentRouterStyle({ linkHref: '/wtf' })}`}
                href="/wtf"
              >
                WTF?
              </a>
              <a
                class={`mr-6 ${this.currentRouterStyle({
                  linkHref: '/explore',
                })}`}
                href="/explore"
              >
                Explore
              </a>
              <a
                class={`mr-6 ${this.currentRouterStyle({ linkHref: '/taps' })}`}
                href="/taps"
              >
                TAPs
              </a>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
