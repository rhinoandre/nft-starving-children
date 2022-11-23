import NftCard from './NftCard'

export default function NftGrid({ nfts, side }) {
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {nfts.map((nft) => (
        <NftCard nft={nft} side={side} />
      ))}
    </div>
  )
}
