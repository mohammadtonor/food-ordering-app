// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb"

if (!process.env.MONGO_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGO_URL
const options = {}


const client = globalThis.MongoClient || new MongoClient(uri, options);
if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect()
}

const clientPromise = process.env.NODE_ENV !== "production" ?
  global._mongoClientPromise :
  client.connect();


export default clientPromise
