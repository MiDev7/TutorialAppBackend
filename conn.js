import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Store uri and cliend obtained from env file
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);


// define connection
let conn;

try {
  // Initiate connection
  conn = await client.connect();
  console.log("Connected to the database");
} catch (err) {
  console.log(err);
}

// Set database to TuitionApp
let db = conn.db("TuitionApp");
export default db;
