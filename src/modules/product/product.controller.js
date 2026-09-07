const { Router } = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addCategoryColumn,
    removeCategoryColumn,
    modifyContactNumber,
    addNotNullToProductName,
    seedData,
    updateBreadPrice,
    deleteEggsProduct
} = require('./product.service.js');

const productRouter = Router();

// CRUD Endpoints
productRouter.post('/products', createProduct);
productRouter.get('/products', getAllProducts);
productRouter.get('/products/:id', getProductById);
productRouter.put('/products/:id', updateProduct);
productRouter.delete('/products/:id', deleteProduct);

// Alter Table Endpoints
productRouter.post('/products/alter/add-category', addCategoryColumn);
productRouter.delete('/products/alter/remove-category', removeCategoryColumn);
productRouter.patch('/suppliers/alter/contact-number', modifyContactNumber);
productRouter.patch('/products/alter/not-null-name', addNotNullToProductName);

// Seed & Custom Modification Endpoints
productRouter.post('/seed-data', seedData);
productRouter.patch('/products/update-bread', updateBreadPrice);
productRouter.delete('/products/delete-eggs', deleteEggsProduct);

module.exports = productRouter;