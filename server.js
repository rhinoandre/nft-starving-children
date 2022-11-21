import Nullstack from 'nullstack';
import Application from './src/Application';
import { MongoClient } from 'mongodb';

const context = Nullstack.start(Application);

function isAdminAccount(walletAddress) {
  return context.secrets.admAccounts === walletAddress;
}

context.start = async function start() {
  const { secrets } = context;

  const databaseClient = new MongoClient(secrets.databaseHost);
  await databaseClient.connect();
  context.database = await databaseClient.db(secrets.databaseName);
  context.isAdminAccount = isAdminAccount;
}

export default context;