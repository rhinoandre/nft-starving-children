import Nullstack, { NullstackSecrets, NullstackServerContext } from 'nullstack';
import Application from './src/Application';
import { MongoClient, Db } from 'mongodb';

interface CustomNullstackServerContext extends NullstackServerContext {
  database: Db
}

const context = Nullstack.start(Application) as CustomNullstackServerContext;

async function startDatabase(secrets: NullstackSecrets) {
  try {
    const databaseClient = new MongoClient(process.env.MONGODB_HOST);
    await databaseClient.connect();
    context.database = await databaseClient.db(process.env.MONGODB_DATABASE_NAME);
  } catch (error) {
    console.log(error)
    console.log(process.env)
  }
}

context.start = async function start() {
  await startDatabase(context.secrets);
}

export default context;