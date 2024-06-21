import express from "express";
import transactionRouter from "./routers/transaction.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", transactionRouter);

export default app;