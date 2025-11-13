import express from "express";
import { resetDatabase } from "../controllers/reset.controller.js";

import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection);

router.post("/", resetDatabase);

export default router;
