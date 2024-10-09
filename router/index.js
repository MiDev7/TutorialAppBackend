import express from "express";
import db from "../conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

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

// router.patch("/incrementspace/:id", async (req, res) => {
//   const id = req.params.id;
//   if (req.session.cart) {
//     req.session.cart.array.forEach((element) => {
//       if (element._id === id) {
//         element.space -= 1;
//         if (element.space === 0) {
//           req.session.cart.splice(req.session.cart.indexOf(element), 1);
//         }
//       }
//     });
//   } else {
//     let nonExistingItem = await db
//       .collection("class")
//       .findOne({ _id: new ObjectId(id) });

//     req.session.cart.push({ ...nonExistingItem, space: 1 });
//   }
//   try {
//
//     await db.collection("class").updateOne({ _id: id }, { $inc: { space: 1 } });
//     res.status(200).json({ message: "Space incremented" });
//
//   } catch (err) {
//
//   }
// });

// router.patch("/decrementspace/:id", async (req, res) => {
//   const id = req.params.id;
//
//
//   if (req.session.cart?.length > 0 || req.session.cart) {
//     req.session.cart.forEach((element) => {
//       if (element._id === id) {
//         element.space += 1;
//       } else {
//         req.session.cart.push({ ...element, space: 1 });
//       }
//     });
//   } else {
//     let nonExistingItem = await db
//       .collection("class")
//       .findOne({ _id: new ObjectId(id) });

//     req.session.cart = [{ ...nonExistingItem, space: 1 }];
//     req.session.save();
//   }

//   // Set space to 1 in cart

//
//   try {
//
//     await db
//       .collection("class")
//       .updateOne({ _id: new ObjectId(id) }, { $inc: { space: -1 } });
//     res.status(200).json({ message: "Space decremented" });
//
//   } catch (err) {
//
//   }
// });

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
          ],
        })
        .toArray();
      res.status(200).json(result);
    } else {
      await db
        .collection("lesson")
        .find()
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
