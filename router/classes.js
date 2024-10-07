import express from "express";
import db from "../conn.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    db.collection("class")
      .find()
      .toArray()
      .then((classes) => {
        res.json(classes);
      });
    console.log("Classes retrieved");
  } catch (err) {
    console.log(err);
  }
});

router.get("/search", (req, res) => {});

router.post("/checkout", (req, res) => {});

export default router;
