import dotenv from "dotenv";
dotenv.config();

const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT;

export {
    mongo_url,
    port
}