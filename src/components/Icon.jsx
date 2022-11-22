const ICONS = {
  tap: '/icons/tap.svg',
  flow: '/icons/flow.svg',
  account: '/icons/account.svg',
  admAccount: '/icons/admAccount.svg',
  wallet: '/icons/wallet.svg',
  logout: '/icons/logout.svg',
  traits: '/icons/traits.svg',
  cube: '/icons/cube.svg',
  faucet: '/icons/faucet.svg',
  collection: '/icons/collection.svg',
  imagePlaceholder: '/icons/imagePlaceholder.svg',
}

function Icon({ type, class: clazz }) {
  const icon = ICONS[type];

  if (!icon) return null;

  return (
    <img src={icon} class={clazz} />
  )
}

export default Icon;