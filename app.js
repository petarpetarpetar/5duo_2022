const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.post('/order', (req, res) => {

    //req.body
    res.status(200);
    res.send('Hello World!')
})

app.get('/orderbook', (req, res) => {

    //req.body
    res.status(200);
    res.send('Hello World!')
})

app.get('/order/:ID', (req, res) => {
    res.status(200);
    res.send("Hello World!")
})

app.delete('/order/all', (req, res) => {

    res.status(200);
    res.send("Hello World!");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})