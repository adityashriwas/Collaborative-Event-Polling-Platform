import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createEvent, editEvent, deleteEvent } from "../controllers/event.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createEvent);
router.route("/:id").put(isAuthenticated, editEvent);
router.route("/:id").delete(isAuthenticated, deleteEvent);

export default router;