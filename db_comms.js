import { config } from 'dotenv';
config()
import mongoose from "mongoose";

import { OrderbookModel } from "./models/orderbook.js"
import { TradeModel } from "./models/trade.js"
import { OrderModel } from "./models/order.js"

//Connect to the remote database
const uri = process.env.DB_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

//Test the connection
const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

//Get the default connection
const db = mongoose.connection;
//Bind an error message if connection fails.
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export { OrderModel, OrderbookModel, TradeModel }