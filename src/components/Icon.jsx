import Nullstack from 'nullstack';

const ICONS = {
  tap: '/icons/tap.svg',
  flow: '/icons/flow.svg',
  account: '/icons/account.svg',
  wallet: '/icon/wallet.svg',
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