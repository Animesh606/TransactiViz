import axios from "axios";
import { sourceDataUrl, port } from "../constants.js";
import Transaction from "../models/transaction.model.js";

const initializeTransaction = async (req, res) => {
    try {
        // Get data from URL
        const response = await axios.get(sourceDataUrl);

        // Insert the instance to custom database
        await Transaction.insertMany(response.data);

        // Send successful response
        res.status(201).send('Database initialized');

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error initializing database');
    }
}

const getTransactions = async (req, res) => {
    try {
        // Get queries from request
        const { month, search, page = 1, perPage = 10 } = req.query;

        // Get the monthnumber and match it
        const monthNumber = new Date(`${month} 1, 2024`).getMonth() + 1;
        const matchStage = {
            $match: {
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, monthNumber]
                }
            }
        };
        
        // Search contents if any
        const searchStage = search
        ? {
            $match: {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { price: { $regex: search, $options: 'i' } }
                ]
            }
        } : {};
        
        // Apply Pagination
        const skipStage = {
            $skip: (page - 1) * perPage
        };
        const limitStage = {
            $limit: parseInt(perPage)
        };
        
        // Form the pipeline with the Stages
        const pipeline = [matchStage];
        if (search) {
            pipeline.push(searchStage);
        }
        pipeline.push(skipStage, limitStage);

        // Aggregate through Pipeline
        const transactions = await Transaction.aggregate(pipeline);

        // Send the JSON file
        res.status(200).json(transactions);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error fetching transactions');
    }
}

const getStatistics = async (req, res) => {
    try {
        // Get the month and filter database with it
        const { month } = req.query;
        const monthNumber = new Date(`${month} 1, 2024`).getMonth();

        const matchStage = {
            $match: {
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, monthNumber]
                }
            }
        };
        
        // Find transactions
        const transactions = await Transaction.aggregate([matchStage]);
        
        // Calculate the required Informations
        const totalSaleAmount = transactions.reduce((sum, tx) => sum + tx.price, 0);
        const totalSoldItems = transactions.filter(tx => tx.sold).length;
        const totalNotSoldItems = transactions.filter(tx => !tx.sold).length;
        
        // Send the JSON file
        res.status(200).json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error fetching statistics');
    }
}

const getBarChart = async (req, res) => {
    try {
        // Get the month and filter database with it
        const { month } = req.query;
        const monthNumber = new Date(`${month} 1, 2024`).getMonth();
        
        const matchStage = {
            $match: {
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, monthNumber]
                }
            }
        };
        
        // Find Transactions
        const transactions = await Transaction.aggregate([matchStage]);

        // The price range to track
        const priceRanges = [
            { range: '0-100', count: 0 },
            { range: '101-200', count: 0 },
            { range: '201-300', count: 0 },
            { range: '301-400', count: 0 },
            { range: '401-500', count: 0 },
            { range: '501-600', count: 0 },
            { range: '601-700', count: 0 },
            { range: '701-800', count: 0 },
            { range: '801-900', count: 0 },
            { range: '901-above', count: 0 }
        ];

        transactions.forEach(tx => {
            const price = tx.price;
            if (price <= 100) priceRanges[0].count++;
            else if (price <= 200) priceRanges[1].count++;
            else if (price <= 300) priceRanges[2].count++;
            else if (price <= 400) priceRanges[3].count++;
            else if (price <= 500) priceRanges[4].count++;
            else if (price <= 600) priceRanges[5].count++;
            else if (price <= 700) priceRanges[6].count++;
            else if (price <= 800) priceRanges[7].count++;
            else if (price <= 900) priceRanges[8].count++;
            else priceRanges[9].count++;
        });

        // Send the JSON file
        res.status(200).json(priceRanges);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error in fetch bar chart" });
    }
}

const getPieChart = async (req, res) => {
    try {
        // Get the month from queries
        const { month } = req.query;
        const monthNumber = new Date(`${month} 1, 2024`).getMonth();

        // Filter with month
        const matchStage = {
            $match: {
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, monthNumber]
                }
            }
        }

        // Grouped with category
        const groupStage = {
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        }

        const categories = await Transaction.aggregate([ matchStage, groupStage ]);

        // Send response JSON file
        res.status(200).json(categories);
    
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error in fetch pie chart" });
    }
}

const getCombinedStatistics = async (req, res) => {
    try {
        // Get month from query
        const { month } = req.query;

        // Get the domain from request
        const domain = req.protocol + "://" + req.hostname;

        // Get statistics, batchart and piechart by requesting
        const [statistics, barChart, pieChart] = await Promise.all([
            axios.get(`${domain}:${port}/api/statistics?month=${month}`),
            axios.get(`${domain}:${port}/api/barchart?month=${month}`),
            axios.get(`${domain}:${port}/api/piechart?month=${month}`)
        ]);

        // Send the JSON file
        res.json({
            statistics: statistics.data,
            barChart: barChart.data,
            pieChart: pieChart.data
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error fetching combined data');
    }
}

export {
    initializeTransaction,
    getTransactions,
    getStatistics,
    getBarChart,
    getPieChart,
    getCombinedStatistics
}