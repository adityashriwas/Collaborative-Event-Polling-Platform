import express from "express";
import {
  getUserNotifications,
  markAsRead,
} from "../controllers/notification.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/").get(isAuthenticated, getUserNotifications);
router.route("/:id/read").patch(isAuthenticated, markAsRead);

export default router;
