import express from "express";
import db from "../conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();


// GET route get all the lessons in the lesson collection
router.get("/lessons", (req, res) => {
  req.session.cart = [];
  try {
    db.collection("lesson")
      .find()
      .toArray()
      .then((classes) => {
        res.json(classes);
      });
  } catch (err) {}
});

// POST route to add order to the order collection
router.post("/order", async (req, res) => {
  const { name, cart } = req.body;

  const carts = await db.collection("order").find({ name: name }).toArray();

  try {
    // Use another name
    if (carts.length > 0) {
      res.status(200).json({ message: "Class already booked with that name" });
      return;
    }

    db.collection("order").insertOne(req.body);

    res.status(200).json({ message: "Class added" });
  } catch (err) {
    res.status(500).json({ message: "Error adding class" });
  }
});


// PUT route to update the lesson details in the lesson collection after checkout
router.put("/lesson", async (req, res) => {
  const { body } = req;
  const data = {
    subject: body.subject,
    location: body.location,
    price: body.price,
    space: body.space,
  };
  console.log(data);
  try {
    await db
      .collection("lesson")
      .updateOne({ _id: new ObjectId(body._id) }, { $set: data });
    res.status(200).json({ message: "Lesson updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating lesson" });
  }
});

// GET route to search a specific lesson based on the query sent by the user 
router.get("/search", async (req, res) => {
  const { search } = req.query;

  try {
    if (search) {
      const result = await db
        .collection("lesson")
        .find({
          $or: [
            { subject: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { price: { $regex: search, $options: "i" } },
            { space: { $regex: search, $options: "i" } },
          ],
        })
	.sort({subject: 1})
        .toArray();
      res.status(200).json(result);
    } else {
      await db
        .collection("lesson")
        .find()
	.sort({subject: 1})
        .toArray()
        .then((result) => {
          res.status(200).json(result);
        });
    }
  } catch (err) {
    res.status(500).json({ message: "Error searching for lesson" });
  }
});

export default router;
