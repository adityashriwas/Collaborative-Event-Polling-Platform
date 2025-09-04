import express from "express";
import {
  getUserNotifications,
  markAsRead,
} from "../controllers/notification.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getUserNotifications);
router.patch("/:id/read", isAuthenticated, markAsRead);

export default router;
