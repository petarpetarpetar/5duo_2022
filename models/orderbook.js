const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const OrderbookSchema = new Schema({
    buyOrders: [Schema.Types.ObjectId],
    sellOrders: [Schema.Types.ObjectId],
});

//const OrderbookModel = mongoose.model("Orderbooks", OrderbookSchema);

module.exports = { OrderbookSchema };
