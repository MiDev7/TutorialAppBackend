import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./router/index.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import cors from "cors";

// Initiate .env file
dotenv.config();

// Create express app
const app = express();

// Define a custom port for local usage
const PORT = 3000;

// Set app to make use of json file format
app.use(express.json());

// Use cross-origin resourse sharing for security purposes
app.use(cors());

// Define parameter for session and cookies, implemented for scalability
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

// Add morgan as a logger for debugging
app.use(morgan('combined'));

// Define main route
app.use("/", router);

// Define route for static file
app.use("/static", express.static("public",{fallthrough:true})) ;

app.use("/static/*", (req, res) => {
	res.status(404).send("Image NOT Found");
}) 

// Only for local usage only
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
