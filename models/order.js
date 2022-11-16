import mongoose from "mongoose";
import { TradeSchema } from "./trade.js";
// Define a schema
const Schema = mongoose.Schema;

function getOverwrite(value) {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toString());
    }
    return value;
}

const OrderSchema = new Schema(
    {
        id: { type: Number, required: [true, 'id is a required attribute'] },
        currencyPair: { type: String, enum: ['BTCUSD'], required: [true, 'currencyPair is a required attribute'] },
        createdDateTime: { type: Date, default: Date.now() },
        orderStatus: { type: String, enum: ['OPEN', 'CLOSED'], default: 'OPEN' },
        type: { type: String, enum: ['BUY', 'SELL'], required: [true, 'type is required'] },
        price: { type: Schema.Types.Decimal128, get: getOverwrite, min: [0, "Price can't be negative"], required: [true, "price is required"] },
        quantity: { type: Schema.Types.Decimal128, get: getOverwrite, min: [0, "Qunatity can't be negative"], required: [true, 'quantity is required'] },
        filledQuantity: { type: Schema.Types.Decimal128, get: getOverwrite, min: [0, "Can't be negative"], default: 0 },
        trades: { type: [TradeSchema] }
    },
    {
        versionKey: false,
        //_id: false
    }
);

const OrderModel = mongoose.model("Orders", OrderSchema);

export { OrderModel };