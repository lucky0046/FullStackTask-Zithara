import { Router } from "express";
import { testRoute } from "../controllers/test.controllers.js";

const router = Router();

router.get("/test", testRoute);

export default router;
