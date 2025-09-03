import express from 'express';
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getUserProfile, login, logout, register } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);

export default router;

