import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    sold: {
        type: Boolean,
        default: false
    },
    dateOfSale: {
        type: Date,
        required: true
    }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;