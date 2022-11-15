import Nullstack, { NullstackServerContext } from 'nullstack';
import Application from './src/Application';
import { MongoClient, Db } from 'mongodb';

interface CustomNullstackServerContext extends NullstackServerContext {
  database: Db
}

const context = Nullstack.start(Application) as CustomNullstackServerContext;

async function startDatabase() {
  const { secrets } = context;

  const databaseClient = new MongoClient(`${secrets.databaseHost}`);
  await databaseClient.connect();
  context.database = await databaseClient.db(`${secrets.databaseName}`);
}

context.start = async function start() {
  await startDatabase();
}

export default context;