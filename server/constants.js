import dotenv from "dotenv";
dotenv.config();

const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT || 5000;
const sourceDataUrl = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

export {
    mongo_url,
    port,
    sourceDataUrl
}