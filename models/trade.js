const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const TradeSchema = new Schema(
    {
        id: Number,
        buyOrderId: Number,
        sellOrderId: Number,
        createDateTime: { type: Date, default: Date.now() },
        price: Schema.Types.Decimal128,
        qunatity: Schema.Types.Decimal128,

    },
    {
        versionKey: false,
    }
);

//const TradeModel = mongoose.model("Trades", TradeSchema);

module.exports = { TradeSchema };