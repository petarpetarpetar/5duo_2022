import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        id: Number,
        currencyPair: { type: String, enum: ['BTCUSD'] },
        createdDateTime: { type: Date, default: Date.now() },
        status: { type: String, enum: ['OPEN', 'CLOSED'] },
        type: { type: String, enum: ['BUY', 'SELL'] },
        price: { type: Schema.Types.Decimal128, min: [0, "Price can't be negative"] },
        quantity: { type: Schema.Types.Decimal128, min: [0, "Qunatity can't be negative"] },
        filledQuantity: { type: Schema.Types.Decimal128, min: [0, "Can't be negative"] },
        trades: [Number]
    },
    {
        versionKey: false,
        //_id: false
    }
);

const OrderModel = mongoose.model("Orders", OrderSchema);

export { OrderModel };