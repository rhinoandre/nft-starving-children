import Nullstack from 'nullstack'

import addressShortener from '../../helpers/addressShortener'
import ButtonLink from '../../components/ButtonLink'
import Logo from '../../components/Logo'
import CreateNFT from './CreateNFT'
import Icon from '../../components/Icon';
import MyNFTs from './MyNFTs'

class Admin extends Nullstack {
  update({ router, walletAddress }) {
    if (!walletAddress) {
      router.url = '/'
    }
  }

  currentRouterStyle({ router, href }) {
    if (router.url === href) {
      return 'border-y bg-gradient-to-r border-light-mustard/50 from-light-mustard/30'
    }
    return 'border-y border-transparent'
  }

  renderLink({ href, children }) {
    return (
      <a
        href={href}
        class={`flex items-center gap-3 py-2 pl-16 ${this.currentRouterStyle({
          href,
        })}`}
      >
        {children}
      </a>
    )
  }

  renderNav() {
    return (
      <nav class="min-h-screen w-1/5 bg-black">
        <div class="flex flex-col items-center gap-5">
          <Logo />
          <ButtonLink class="w-32 bg-yellow-500" href="/admin/create-nft">
            Create NFT
          </ButtonLink>
        </div>
        <div class="mt-10 flex flex-col">
          <Link href="/admin">
            <Icon type="cube" color="#FFF" width="18" />
            Dashboard
          </Link>
          <Link href="/admin/my-nfts/a">
            <Icon type="cube" />
            NFT - A
          </Link>
          <Link href="/admin/my-nfts/b">
            <Icon type="cube" />
            NFT - B
          </Link>
          <Link href="/admin/traits">
            <Icon type="traits" />
            Traits
          </Link>
        </div>
      </nav>
    )
  }

  logout({ router, logout }) {
    if (confirm('Sign out')) {
      logout();
      router.url = '/'
    }
  }

  renderLogout({ walletAddress }) {
    return (
      <div class="absolute right-10 top-5 flex gap-5">
        <div class="flex items-center gap-1">
          <Icon type="wallet" width={16} color="#FFC701" />
          <span title={walletAddress}>
            {addressShortener({ address: walletAddress })}
          </span>
        </div>
        <div class="flex items-center gap-1">
          <Icon type="logout" />{' '}
          <span>
            <a class="cursor-pointer" onclick={this.logout}>
              logout
            </a>
          </span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <main class="relative flex min-h-screen w-full max-w-[1680px] bg-gray-900 2xl:mx-auto">
        <Logout />
        <Nav />
        <section class="w-4/5">
          <CreateNFT route="/admin/create-nft" />
          <MyNFTs route="/admin/my-nfts/:side" />
          <div route='/admin/*'>Comming</div>
        </section>
      </main>
    )
  }
}

export default Admin
