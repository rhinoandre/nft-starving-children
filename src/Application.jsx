import Nullstack from 'nullstack';
import '../tailwind.css';
import Home from './pages/Home';
import Box3D from './components/Box3D';
import Price from './components/Price';

class Application extends Nullstack {
  nftChildren;

  static async getNFTChildren({ database }) {
    return await database.collection('children_nft').find().toArray();
  }

  async initiate() {
    this.nftChildren = await this.getNFTChildren();
  }

  prepare({ page }) {
    page.locale = 'en-US';
  }

  renderHead() {
    return (
      <head>
        <link
          href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap"
          rel="stylesheet" />
      </head>
    )
  }

  render() {
    return (
      <body class="bg-gray-900 text-white font-roboto">
        <Head />
        <div class="flex gap-3">
          <Box3D>
            <img src='/child1.png' />
          </Box3D>
          <Box3D>
            <img src='/child2.png' />
            <div>
              <h3>NFT Name</h3>
              <h4>Creator's name</h4>
            </div>
            <Price value="0.49" />
          </Box3D>
        </div>
        <Home route="/" greeting="Welcome to Nullstack!" />
      </body>
    )
  }

}

export default Application;