import Nullstack from 'nullstack';

import NftGrid from '../../components/nftGrid';
import SimpleTitle from '../../components/SimpleTitle';

class MyNFTs extends Nullstack {
  nfts;
  loading = true;

  static async getNFTs({ dbCollection }) {
    return await dbCollection.find().toArray();
  }

  async initiate() {
    this.loading = true;
    this.nfts = await this.getNFTs()
    this.loading = false;
  }

  render({ params }) {
    if (this.loading) {
        return <p>Loading...</p>
    }
    return (
        <section class="pl-10 pt-14">
        <div>
          <SimpleTitle>NFTs</SimpleTitle>
          <p class="text-gray-300">Manage all your NFTs</p>
        </div>
        <div class="mt-20">
          {!this.nfts.length && (
            <p class="text-3xl">No NFTs owned</p>
          )}
          {this.nfts?.length > 0 && <NftGrid nfts={this.nfts} side={params.side} />}
        </div>
      </section>
    )
  }

}

export default MyNFTs;
