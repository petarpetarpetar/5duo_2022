import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;

const OrderbookSchema = new Schema(
    {
        buyOrders: [Number],
        sellOrders: [Number],
    },
    {
        versionKey: false,
        //_id: false
    }
);

const OrderbookModel = mongoose.model("Orderbooks", OrderbookSchema);

export { OrderbookModel };