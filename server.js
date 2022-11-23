import Nullstack from 'nullstack';
import Application from './src/Application';
import { MongoClient } from 'mongodb';
import { getNFTContract, getProviderAndSigner } from './src/services/contracts';

const context = Nullstack.start(Application);

function isAdminAccount(walletAddress) {
  return context.secrets.admAccounts.includes(walletAddress);
}

context.start = async function start() {
  const { secrets, settings } = context;

  const databaseClient = new MongoClient(secrets.databaseHost);
  await databaseClient.connect();
  const database = await databaseClient.db(secrets.databaseName);

  context.database = database;
  context.dbCollection = database.collection('children_nft');
  context.isAdminAccount = isAdminAccount;

  context.provider = getProviderAndSigner(settings.providerNetwork).provider;
  context.nftContract = getNFTContract(settings.providerNetwork)();
}

export default context;