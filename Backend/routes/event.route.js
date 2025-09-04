import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createEvent,
  editEvent,
  deleteEvent,
  getEvent,
  getAllEvents,
  getMyEvents,
  voteLocation,
  inviteUser,
  acceptInvite,
} from "../controllers/event.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createEvent);
router.route("/:id").put(isAuthenticated, editEvent);
router.route("/:id").delete(isAuthenticated, deleteEvent);
router.route("/my-events").get(isAuthenticated, getMyEvents);
router.route("/:id").get(getEvent);
router.route("/").get(getAllEvents);
router.route("/vote").post(isAuthenticated, voteLocation);
router.route("/invite").post(isAuthenticated, inviteUser);
router.route("/accept-invite").post(isAuthenticated, acceptInvite);

export default router;
