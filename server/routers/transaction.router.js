import { Router } from "express";
import { initializeTransaction, getTransactions, getStatistics, getBarChart, getPieChart, getCombinedStatistics } from "../controllers/transaction.controller.js";

const router = Router();

router.get("/initialize", initializeTransaction);
router.get("/transactions", getTransactions);
router.get("/statistics", getStatistics);
router.get("/barchart", getBarChart);
router.get("/piechart", getPieChart);
router.get("/combined", getCombinedStatistics);

export default router;