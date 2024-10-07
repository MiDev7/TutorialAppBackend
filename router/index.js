import express from "express";
import ClassesRouter from "./classes.js";
const router = express.Router();

router.use("/classes", ClassesRouter);

export default router;
