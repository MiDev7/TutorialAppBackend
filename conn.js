import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let conn;

try {
  conn = await client.connect();
  console.log("Connected to the database");
} catch (err) {
  console.log(err);
}

let db = conn.db("TuitionApp");
export default db;
