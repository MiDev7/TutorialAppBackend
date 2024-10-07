import db from "../conn.js";

export default class Classes {
  static async getClasses(req, res) {
    try {
      const classes = await db.collection("class").find().toArray();
      res.json(classes);
    } catch (err) {
      console.log(err);
    }
  }

  static async addClass(req, res) {
    try {
      const { body } = req;
      const newClass = body;
      await db.collection("class").insertOne(newClass);
      res.json(newClass);
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteClass(req, res) {
    try {
      await db.collection("class").deleteOne({ name: req.params.name });
      res.json({ message: "Class deleted" });
    } catch (err) {
      console.log(err);
    }
  }
}
