import connectDB from "./db/dbConnect.js";
import { port } from "./constants.js"
import app from "./app.js";

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    })
    .catch((err) => {
        console.error(err);
    })