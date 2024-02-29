import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

import testRouter from "./src/routes/test.route.js";
import customerRecordsRouter from "./src/routes/customerRecords.route.js";
app.use("/api/v1", testRouter);
app.use("/api/v1", customerRecordsRouter);

export default app;
