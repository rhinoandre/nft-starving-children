import Icon from '../components/Icon';

export default function NftCard({ nft, side = 'a' }) {
  const isSideA = side === 'a';
  const nftData = isSideA ? nft.childData : nft.donationData;
  return (
    <div class="overflow-hidden flex flex-col border bg-black p-2">
      <img src={nftData.fileUrl} alt={nftData.name} />
      <div class="mt-4">
        <p class="text-2xl font-semibold">{nftData.name}</p>
        <div class="h-6 overflow-hidden">
          <p class="text-white">{nftData.description}</p>
        </div>
      </div>
      <div class="mt-4">
        <span class="text-sm">{isSideA ? 'Price' : 'Donation'}</span>
        {isSideA && <div class="flex gap-2 items-end justify-between">
          <p class="flex text-lg font-bold text-white">
            <span class="mt-1 mr-2">
              <Icon type="tap" />
            </span>
            {nft.price}
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
