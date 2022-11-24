const { default: context } = require('../.development/server');
const { ethers, BigNumber, utils } = require('ethers');
const StarvingChildren = require('../blockchain/artifacts/blockchain/contracts/StarvingChildren.sol/StarvingChildren.json');

const perPage = 100;
const contractAddress = process.env.NULLSTACK_SECRETS_STARVING_CHILDREN_ADDRESS;
const providerNetwork = process.env.NULLSTACK_SETTINGS_PROVIDER_NETWORK;
const provider = new ethers.providers.JsonRpcProvider(providerNetwork);
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
  provider.on('block', async (blockNumber) => {
    console.log('Handling block:', blockNumber);
    if (blockNumber <= lastScannedBlock) {
      console.log('Skipping... Block already handled');
      return;
    };

    const events = await contract.queryFilter('TemplateCreated', lastScannedBlock, lastScannedBlock + perPage);
    for (const event of events) {
      lastScannedBlock = blockNumber;
      const { templateId, childURI, donationURI, price } = event.args;
      const NFTTemplate = {
        templateId: BigNumber.from(templateId).toNumber(),
        childURI,
        donationURI,
        price: utils.formatUnits(price)
      };

      console.log('Saving TemplateCreated.args', NFTTemplate);

      saveTemplateInfo({
        dbCollection,
        ...NFTTemplate
      });
    }

    await database.collection('lastBlock').updateOne(
      { _id: lastBlockEntry._id },
      { $set: { 'lastScannedBlock': blockNumber } }
    );
  })

  // listen();
}
scan();
