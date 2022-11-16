const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    id: Schema.Types.ObjectId,
    currencyPair: { type: String, lowercase: false },
    createdDateTime: { type: Date, default: Date.now() },
    type: { type: String, enum: ['OPEN', 'CLOSED'] },
    price: Schema.Types.Decimal128,
    quantity: Schema.Types.Decimal128,
    filledQuantity: Schema.Types.Decimal128,
    status: String,
    trades: [Schema.Types.ObjectId]

});

//const OrderModel = mongoose.model("Orders", OrderSchema);

module.exports = { OrderSchema };