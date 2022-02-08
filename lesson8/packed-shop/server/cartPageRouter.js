const express = require('express');
const fs = require('fs');
const routerP = express.Router();
const handler = require('./handler');

routerP.get('/', (req, res) => {
    fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    })
});
routerP.put('/:id', (req, res) => {
    handler(req, res, 'quant', 'server/db/userCart.json');
});
routerP.delete('/:id', (req, res) => {
    handler(req, res, 'del', 'server/db/userCart.json');
});
routerP.post('/', (req, res) => {
    handler(req, res, 'clear', 'server/db/userCart.json');
});
module.exports = routerP;