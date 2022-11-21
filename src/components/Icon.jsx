import Nullstack from 'nullstack';

const ICONS = {
  tap: '/icons/tap.svg',
  flow: '/icons/flow.svg',
  account: '/icons/account.svg',
  admAccount: '/icon/admAccount.svg',
  wallet: '/icon/wallet.svg',
  logout: '/icon/logout.svg',
  traits: '/icon/traits.svg',
  cube: '/icon/cube.svg',
  faucet: '/icons/faucet.svg',
  collection: '/icons/collection.svg'
}

class Icon extends Nullstack {
  render({ type }) {
    const icon = ICONS[type];

    if(!icon) return null;

    return (
      <img src={icon} />
    )
  }

}

export default Icon;