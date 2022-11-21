import ButtonLink from './buttonLink'
import Title from './Title'

export default function Footer() {
  return (
    <section class="h-[425px] bg-[url('/bg-grid.svg')] bg-cover">
      <div class="flex flex-col items-center pt-40">
        <Title text="With" highlightedText="great power" secondaryText="comes non-fungibility" />
        <p class="mb-16">
          What Uncle Ben and Uncle Satoshi mean is that you can use your “power”
          to change the world... by minting a few NFTs.
        </p>
        <ButtonLink href="/explore" clazz="w-96 bg-rose uppercase">
          Buy a NFT to a Starving Child
        </ButtonLink>
      </div>
    </section>
  )
}
