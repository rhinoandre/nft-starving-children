const hre = require('hardhat')
const fs = require('fs')

async function main() {
  const tap = await hre.ethers.getContractFactory('TAP');
  const tapContract = await tap.deploy();
  await tapContract.deployed();

  const starvingChildren = await hre.ethers.getContractFactory('StarvingChildren');
  const starvingChildrenContract = await starvingChildren.deploy();
  await starvingChildrenContract.deployed();


  console.log('StarvingChildren deployed to:', starvingChildrenContract.address);
  console.log('TAP deployed to:', tapContract.address);

  fs.writeFileSync(
    './config.js',
    `export const starvingChildrenAddress = '${starvingChildrenContract.address}';
export const tapAddress = '${tapContract.address}';`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
