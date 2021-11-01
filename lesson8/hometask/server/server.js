const express = require('express');
const fs = require('fs');
const app = express();
const cart = require('./cartRouter');//обработчик всех запросов корзины
const cartPage = require('./cartPageRouter')

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/cart', cart);
app.use('/api/cart-page', cartPage);

// app.get();
// app.post();
// app.put();
// app.delete();

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    })
});
app.get('/api/men-catalog', (req, res) => {
    fs.readFile('server/db/men-catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    })
});
app.get('/api/recommended', (req, res) => {
    fs.readFile('server/db/recommended.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    })
});
app.get('/api/product', (req, res) => {
    fs.readFile('server/db/product.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    })
});
// app.get('/api/cart/:id', (req, res) => {
//    // res.send(req.params.id);
//     res.send(req.query);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));