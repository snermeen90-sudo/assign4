const express = require('express');
const app = express();
const port = 3000;

const { connected_db } = require('./src/DB/connectionDB.js');
const productRouter = require('./src/modules/product/product.controller.js');
const supplierRouter = require('./src/modules/supplier/supplier.controller.js');
const salesRouter = require('./src/modules/sales/sales.controller.js');

const bootstrap = () => {
    app.use(express.json());

    connected_db(app, port);

    app.use('/api', productRouter);
    app.use('/api', supplierRouter);
    app.use('/api', salesRouter);

    app.use((req, res) => {
        return res.status(404).json({ message: `URL: ${req.originalUrl} not found` });
    });
};

module.exports = { bootstrap };