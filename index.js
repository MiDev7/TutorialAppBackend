import express from "express";
import dotenv from "dotenv";
import router from "./router/index.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import cors from "cors";
import logger from "./logger.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: "TuitionApp",
    }),
  })
);

app.use(logger);

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
