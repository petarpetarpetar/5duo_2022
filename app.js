import { OrderModel, OrderbookModel, TradeModel } from './db_comms.js'
import express from 'express'
const app = express()
const port = 3000

app.use(express.json());

function docParser(doc) {
    try {
        var ent = { ...doc['_doc'] };
        delete ent['_id'];
        Object.keys(ent).forEach(key => {
            ent[key] = doc[key]
        });
        return ent
    }
    catch (err) {
        return NaN
    }
}

function matchOrders(el, res) {
    try {
        //console.log(el['type'] == 'BUY' ? 'a' : 'b');
        OrderModel
            .find({ orderStatus: "OPEN" })
            .where('type').ne(el['type'])
            .sort({ price: el['type'] == 'BUY' ? 1 : -1, createdDateTime: 1 })
            .exec(function (err, raws) {
                if (err) { console.log(err); }
                else {
                    raws.forEach(function (raw) {
                        //make a trade
                        if (el['type'] == "BUY" && el['price'] < raw['price']) return;
                        if (el['type'] == "SELL" && el['price'] > raw['price']) return;
                        let needed = el['quantity'] - el['filledQuantity'];
                        if (needed == 0) return;
                        let filled_raw = raw['quantity'] - raw['filledQuantity'];
                        let min = Math.min(needed, filled_raw)


                        el['filledQuantity'] += min;
                        raw['filledQuantity'] += min;

                        if (el['filledQuantity'] == el['quantity']) { el['orderStatus'] = "CLOSED" }
                        if (raw['filledQuantity'] == raw['quantity']) { raw['orderStatus'] = "CLOSED" }

                        let trade = {
                            id: 0,
                            buyOrderId: el['id'],
                            sellOrderId: raw['id'],
                            price: raw['price'],
                            quantity: min
                        }
                        el.trades.push(trade)
                        raw.trades.push(trade)
                        raw.save();
                    });
                }
                el.save();
                res.status(201);
                res.send(docParser(el))
            })
    }
    catch (err) {
        res.status(400);
        res.send(err.message)
    }
}

app.post('/order', (req, res) => {
    try {
        let new_order = new OrderModel(req.body);

        new_order.save(function (err, raw) {
            if (err) { res.status(400); res.send(err); console.log(err) }
            else {
                matchOrders(raw, res);
            }
        });
    }
    catch (err) {
        res.status(400);
        res.send(err.message)
    }
})

app.get('/orderbook', (req, res) => {
    try {
        var book = { buyOrders: [], sellOrders: [] }
        OrderModel.
            find({ orderStatus: "OPEN" }).
            select('price type quantity').
            exec(function (err, raws) {
                if (err) { console.log(err); }
                else {
                    raws.forEach((raw) => {
                        let ent = docParser(raw);
                        let type = ent['type'];
                        delete ent['type'];
                        type == "BUY" ? book['buyOrders'].push(ent) : book['sellOrders'].push(ent)
                    });
                    res.status(200);
                    res.send(book)
                }
            });
    }
    catch (err) {
        res.status(400);
        res.send(err.message)
    }
})

app.get('/order/:id', (req, res) => {
    try {
        OrderModel.
            findOne({ id: req.params['id'] })
            .exec(function (err, raw) {
                if (err) {
                    res.status(400); res.send(err); return;
                }
                var ent = docParser(raw);
                try {
                    ent.trades.forEach(function (el, index) {
                        ent['trades'][index] = docParser(raw['trades'][index])
                        delete ent['trades'][index]['_id'];
                    })
                }
                catch (err) {
                    res.status(400);
                    res.send(err)
                }
                res.status(200);
                res.send(ent)
            })
    }
    catch (err) {
        res.status(400);
        res.send(err.message)
    }
})

app.delete('/order/all', (req, res) => {
    try {
        OrderModel.deleteMany({}, function (err, reso) {
            if (err) { res.status(400); res.send(err) }
            else { res.status(200); res.send(reso) }
        });
    }
    catch (err) {
        res.status(400);
        res.send(err.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})