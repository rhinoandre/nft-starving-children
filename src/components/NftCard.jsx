import Icon from '../components/Icon';

export default function NftCard({ nft }) {
  return (
    <div class="overflow-hidden flex flex-col border bg-black p-2">
      <img src={nft.image} alt={nft.name} />
      <div class="mt-4">
        <p class="text-2xl font-semibold">{nft.name}</p>
        <div class="h-6 overflow-hidden">
          <p class="text-white">{nft.description}</p>
        </div>
      </div>
      <div class="mt-4">
        <span>Price</span>
        <div class="flex gap-2 items-end justify-between">
          <p class="flex text-2xl font-bold text-white">
            <span class="mt-2 mr-2">
              <Icon type="tap" />
            </span>
            {nft.price}
          </p>
        </div>
        {nft.tokenId && (
          <button
            class="mt-4 w-full rounded bg-mustard py-2 px-12 font-bold text-black"
            onclick={() => this.buyNFT({ nft })}
          >
            Buy
          </button>
        )}
      </div>
    </div>
  );
}
