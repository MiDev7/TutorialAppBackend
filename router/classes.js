import express from "express";
import Classes from "../controller/classes.js";

const router = express.Router();

router.get("/", Classes.getClasses);

router.post("/", Classes.addClass);

router.delete("/:name", Classes.deleteClass);

export default router;
