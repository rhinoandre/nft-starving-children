const { default: context } = require('../.development/server');
const { ethers, BigNumber, utils } = require('ethers');
const StarvingChildren = require('../blockchain/artifacts/blockchain/contracts/StarvingChildren.sol/StarvingChildren.json');

const perPage = 100;
const contractAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';
const provider = new ethers.providers.JsonRpcProvider();
const contract = new ethers.Contract(contractAddress, StarvingChildren.abi, provider);

async function saveTemplateInfo({ dbCollection, templateId, childURI, donationURI, price }) {
  const entry = {
    id: templateId,
    childURI: childURI,
    donationURI: donationURI,
    price
  };

  const result = await dbCollection.insertOne(entry);
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
}

async function scan() {
  console.log('listening for events...')
  await context.start()
  const { database, dbCollection } = context

  const lastBlockEntry = await database.collection('lastBlock').findOne();
  let lastScannedBlock = lastBlockEntry.lastScannedBlock;
  async function listen() {
    const events = await contract.queryFilter('*', lastScannedBlock, lastScannedBlock + perPage);
    for (const event of events) {
      lastScannedBlock = lastScannedBlock + 1;
      if (event.event === 'TemplateCreated') {
       const { templateId, childURI, donationURI, price } = event.args;
        console.log('TemplateCreated.args', event.blockNumber, lastScannedBlock, { templateId: ethers.BigNumber.from(templateId).toNumber(), childURI, donationURI, price: ethers.utils.formatUnits(price) })
        saveTemplateInfo({
          dbCollection,
          templateId: BigNumber.from(templateId).toNumber(),
          childURI,
          donationURI,
          price: utils.formatUnits(price)
        });
      }
    }
    await database.collection('lastBlock').updateOne(
      { _id: lastBlockEntry._id },
      { $set: { 'lastScannedBlock': lastScannedBlock } }
    );
    setTimeout(listen, 10000);
  }

  listen();
}
scan();
