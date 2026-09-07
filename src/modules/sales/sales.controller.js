const { Router } = require('express');
const {
    recordSale,
    getAllSales,
    getSalesByProductId,
    getTotalSoldPerProduct,
    getHighestStockProduct,
    getSuppliersStartingWithF,
    getUnsoldProducts,
    getSalesWithProductDetails
} = require('./sales.service.js');

const salesRouter = Router();

salesRouter.post('/sales', recordSale);
salesRouter.get('/sales', getAllSales);
salesRouter.get('/sales/product/:productId', getSalesByProductId);

// Reporting Endpoints
salesRouter.get('/reports/total-sold', getTotalSoldPerProduct);
salesRouter.get('/reports/highest-stock', getHighestStockProduct);
salesRouter.get('/reports/suppliers-f', getSuppliersStartingWithF);
salesRouter.get('/reports/unsold-products', getUnsoldProducts);
salesRouter.get('/reports/sales-details', getSalesWithProductDetails);

module.exports = salesRouter;