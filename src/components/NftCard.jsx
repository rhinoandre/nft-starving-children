import Nullstack from 'nullstack';

import Icon from '../components/Icon';
import Loading from '../components/Loading';

export default class NftCard extends Nullstack {
  loading = true;
  nftData;

  async fetchNFTData({ nftURI }) {
    const result = await fetch(`https://gateway.pinata.cloud/ipfs/${nftURI}`);
    const data = await result.json();
    return data;
  }

  async initiate() {
    this.loading = true;
    this.nftData = await this.fetchNFTData()
    this.loading = false;
  }

  render({ price }) {
    if (this.loading) {
      return <Loading />
    }

    return (
      <div class="overflow-hidden flex flex-col border bg-black p-2">
        <img src={this.nftData.image} alt={this.nftData.name} />
        <div class="mt-4">
          <p class="text-2xl font-semibold">{this.nftData.name}</p>
          <div class="h-6 overflow-hidden">
            <p class="text-white">{this.nftData.description}</p>
          </div>
        </div>
        <div class="mt-4">
          <span class="text-sm">{this.nftData.price ? 'Price' : 'Donation'}</span>
          {price && <div class="flex gap-2 items-end justify-between">
            <p class="flex text-lg font-bold text-white">
              <span class="mt-1 mr-2">
                <Icon type="tap" />
              </span>
              {price}
            </p>
          </div>}
          {/* {purchasable && (
          <button
            class="mt-4 w-full rounded bg-mustard py-2 px-12 font-bold text-black"
            onclick={() => this.buyNFT({ nft })}
          >
            Buy
          </button>
        )} */}
        </div>
      </div>
    );
  }
}
