require('dotenv').config();
const mongoose = require("mongoose");

const OrderbookSchema = require("./models/orderbook.js")
const TradeSchema = require("./models/trade.js")
const OrderSchema = require("./models/order.js")

//Connect to the remote database
const uri = process.env.DB_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const Orders = mongoose.model('Orders', OrderSchema);
const Trades = mongoose.model('Trades', TradeSchema);
const Orderbooks = mongoose.model('Orderbooks', OrderbookSchema);

Orders.create();


//Test the connection
const connection = mongoose.connection;


connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

//Get the default connection
const db = mongoose.connection;
//Bind an error message if connection fails.
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = { Orders, Trades, Orderbooks };
