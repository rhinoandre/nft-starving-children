import Nullstack, { NullstackSecrets, NullstackServerContext } from 'nullstack';
import Application from './src/Application';
import { MongoClient, Db } from 'mongodb';

interface CustomNullstackServerContext extends NullstackServerContext {
  database: Db
}

const context = Nullstack.start(Application) as CustomNullstackServerContext;

function setSecrets() {
  const { secrets } = context;
  secrets.databaseHost = process.env.MONGODB_HOST;
  secrets.databaseName = process.env.MONGODB_DATABASE_NAME;
}

async function startDatabase(secrets: NullstackSecrets) {
  try {
    const databaseClient = new MongoClient(secrets.databaseHost as string);
    await databaseClient.connect();
    context.database = await databaseClient.db(secrets.databaseName as string);
  } catch (error) {
    console.log(error)
    console.log(secrets)
  }
}

context.start = async function start() {
  setSecrets();

  await startDatabase(context.secrets);
}

export default context;