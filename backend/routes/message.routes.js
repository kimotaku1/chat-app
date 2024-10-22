import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Middleware for logging requests
router.use((req, res, next) => {
	console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
	next();
});

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
