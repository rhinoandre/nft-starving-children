import Nullstack from 'nullstack';
import Box3D from '../components/Box3D';
import Price from '../components/Price';

class Home extends Nullstack {
  prepare({ project, page, greeting }) {
    page.title = `${project.name} - ${greeting}`;
  }

  render() {
    return (
      <section class="w-full max-w-3xl min-h-screen my-0 mx-auto flex items-center p-6 flex-wrap md:flex-nowrap">
        <div class="flex gap-3">
          <Box3D width='s'>
            <img src='/child1.png' />
          </Box3D>
          <Box3D width='m'>
            <img src='/child2.png' />
            <div>
              <h3>NFT Name</h3>
              <h4>Creator's name</h4>
            </div>
            <Price value="0.49" />
          </Box3D>
          <Box3D width='l'>
            <img src='/child1.png' />
          </Box3D>
        </div>
      </section>
    )
  }

}

export default Home;