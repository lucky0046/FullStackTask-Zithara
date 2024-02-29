import { Router } from "express";
import customerRecords from "../controllers/customerRecords.controllers.js";

const router = Router();

router.get("/customer-records", customerRecords);

export default router;
