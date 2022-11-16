const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
    id: Schema.Types.ObjectId,
    buyOrderId: Schema.Types.ObjectId,
    sellOrderId: Schema.Types.ObjectId,
    createDateTime: { type: Date, default: Date.now() },
    price: Schema.Types.Decimal128,
    qunatity: Schema.Types.Decimal128,
});

//const TradeModel = mongoose.model("Trades", TradeSchema);

module.exports = { TradeSchema };