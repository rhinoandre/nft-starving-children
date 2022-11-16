import Nullstack from 'nullstack';
import '../tailwind.css';
import Home from './Home';

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
        {this.nftChildren?.map(child => (<>
          <div>
            <h1>{child.name}</h1>
            <p>{child.nftCode}</p>
            <p>{child.description}</p>
          </div>
          <div>
            <h1>{child.nftForDonation.name}</h1>
            <p>{child.nftForDonation.nftCode}</p>
            <p>{child.nftForDonation.description}</p>
          </div>
        </>))}
        <Home route="/" greeting="Welcome to Nullstack!" />
      </body>
    )
  }

}

export default Application;