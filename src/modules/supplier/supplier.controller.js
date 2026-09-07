const { Router } = require('express');
const { createSupplier, getAllSuppliers, updateSupplier, deleteSupplier } = require('./supplier.service.js');

const supplierRouter = Router();

supplierRouter.post('/suppliers', createSupplier);
supplierRouter.get('/suppliers', getAllSuppliers);
supplierRouter.put('/suppliers/:id', updateSupplier);
supplierRouter.delete('/suppliers/:id', deleteSupplier);

module.exports = supplierRouter;