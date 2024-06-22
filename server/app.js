import express from "express";
import cors from "cors";
import transactionRouter from "./routers/transaction.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use("/api", transactionRouter);

export default app;