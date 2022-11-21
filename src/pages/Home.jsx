import Nullstack from 'nullstack';
import ButtonLink from '../components/ButtonLink';
import Footer from '../components/Footer';
import PageLayout from '../components/Page';
import NftCard from '../components/nftCard';
import Title from '../components/Title';
import Box3D from '../components/Box3D';

class Home extends Nullstack {
  nfts = [
    {
      image:
        'child3.png',
      name: 'Side A',
      description: 'Side A text description',
      price: '0.49',
    },
    {
      image:
        'bottle-water.png',
      name: 'Side B',
      description: 'Side B text description',
      price: '0.49',
    },
  ];

  renderTopContent() {
    return (
      <div class="flex justify-between">
        <div class="mt-32 ml-14 w-96">
          <Title
            text="Your kindness can make the world of a difference for a"
            highlightedText="child's crypto wallet"
          />
          <p class="mt-4">
            They may not have food, but you can help an NFT-less child with this
            buy one, give one opportunity. Every child deserves an NFT.
          </p>
          <div class="mt-4 flex gap-2 font-extrabold">
            <ButtonLink clazz="w-32" href="/explore">
              Explore
            </ButtonLink>
            <ButtonLink
              href="/taps"
              clazz="w-32 border border-rose bg-transparent text-rose"
            >
              Buy TAPs
            </ButtonLink>
          </div>
        </div>
        <Box3D class="w-72">
          <img
            src="/child1.png"
            alt="Sad little girl"
          />
        </Box3D>
      </div>
    );
  }

  renderMiddleContent() {
    return (
      <section class="my-32 text-center">
        <Title
          text="Don't let these weary children lose their"
          highlightedText="last shreds of hope"
        />
        <div class="mt-10 flex justify-between">
          <div class="flex w-72 flex-col items-center">
            <img src="/unimaginable-home.png" width={200} alt="" />
            <h3 class="mb-3 font-extrabold">Unimaginable poverty</h3>
            <p>
              There are children raised in unimaginable poverty. Not only are
              they deprived of clean water, nutritious food, reliable
              electricity and educational opportunities... but they also lack
              NFTs.
            </p>
          </div>
          <div class="flex w-72 flex-col items-center">
            <img src="/theyneedyou-home.png" width={'200'} alt="" />
            <h3 class="mb-3 font-extrabold">They need you</h3>
            <p>
              Please offer your support. Even if a warlord steals their family’s
              smartphone, you will have provided a “token” of non-fungible
              support.
            </p>
          </div>
          <div class="flex w-72 flex-col items-center">
            <img src="/bottleofhope-home.png" width={'200'} alt="" />
            <h3 class="mb-3 font-extrabold">A bottle of hope</h3>
            <p>
              Every dehydrated child can receive an NFT of a water bottle today,
              if only you can find it in your heart and crypto-wallet to give.
            </p>
          </div>
        </div>
      </section>
    );
  }

  renderSecondMiddleContent() {
    return (
      <section class="my-32 flex justify-between gap-5">
        <div class="flex w-1/2 flex-col justify-center gap-4 pl-40">
          <Title
            text="Buy a NFT of a dehydrated child and automatically donate a NFT of a water bottle"
            highlightedText="NFT of a water bottle"
          />
          <p class="text-gray-300">
            Treat your charity like your investments. Expect ROI.
          </p>
        </div>
        <div class="flex w-1/2 justify-center gap-4">
          <NftCard nft={this.nfts[0]} />
          <NftCard nft={this.nfts[1]} />
        </div>
      </section>
    );
  }

  render() {
    return (
      <PageLayout>
        <TopContent />
        <MiddleContent />
        <SecondMiddleContent />
        <Footer />
      </PageLayout>
    );
  }
}

export default Home;
