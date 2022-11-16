import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;

const TradeSchema = new Schema(
    {
        id: Number,
        buyOrderId: Number,
        sellOrderId: Number,
        createDateTime: { type: Date, default: Date.now() },
        price: { type: Schema.Types.Decimal128, min: [0, "Price can't be negative."] },
        qunatity: { type: Schema.Types.Decimal128, min: [0, "Qunatity can't be negative."] },
    },
    {
        versionKey: false,
        //_id: false
    }
);

const TradeModel = mongoose.model("Trades", TradeSchema);

export { TradeModel };