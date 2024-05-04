import express from "express";
import "dotenv/config";

import { connectToDatabase } from "./db.js";
import { router as authRouter } from "./routes/auth.js";
import { router as phishRouter } from "./routes/phish.js";

const app = express();

connectToDatabase();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/phishes", phishRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
