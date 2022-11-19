import Nullstack from 'nullstack';
import '../tailwind.css';
import Header from './components/Header';
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
      <body class="bg-gray-900 text-white font-pragmatica">
        <Head />
        <Header />
        <Home route="/" greeting="Welcome to Nullstack!" />
      </body>
    )
  }

}

export default Application;