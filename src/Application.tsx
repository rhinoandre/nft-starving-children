import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack';
import '../tailwind.css';
import Home from './Home';

declare function Head(): NullstackNode

  interface NFTChildren {
    name: string;
    nftCode: string;
    description: string;
    externalLink: string;
    dehydrated: boolean;
    crying: boolean;
    price: number;
    nftForDonation: {
      name: string;
      nftCode: string;
      description: string;
      externalLink: string;
    }
  }

class Application extends Nullstack {
  nftChildren: NFTChildren[];

  static async getNFTChildren({ database }) {
    return await database.collection('children_nft').find().toArray();
  }

  async initiate(context) {
    this.nftChildren = await Application.getNFTChildren(context);
  }

  prepare({ page }: NullstackClientContext) {
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