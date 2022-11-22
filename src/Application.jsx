import Nullstack from 'nullstack';

import '../tailwind.css';
import Admin from './pages/Admin/Admin';
import Home from './pages/Home';

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

  render() {
    return (
      <body class="bg-gray-900 text-white font-pragmatica">
        <Home route="/" greeting="Welcome to Nullstack!" />
        <Admin route='/admin/*' />
      </body>
    )
  }

}

export default Application;