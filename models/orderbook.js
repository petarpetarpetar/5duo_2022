const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const OrderbookSchema = new Schema(
    {
        buyOrders: [Number],
        sellOrders: [Number],
    },
    {
        versionKey: false
    }
);

//const OrderbookModel = mongoose.model("Orderbooks", OrderbookSchema);

module.exports = { OrderbookSchema };
