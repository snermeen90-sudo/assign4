const { connection } = require('../../DB/connectionDB.js');

// Req 4: Record Sale
const recordSale = async (req, res) => {
    try {
        const { ProductID, QuantitySold, SaleDate } = req.body;
        const [result] = await connection.execute(
            `INSERT INTO sales (ProductID, QuantitySold, SaleDate) VALUES (?, ?, ?)`,
            [ProductID, QuantitySold, SaleDate]
        );
        return res.status(201).json({ message: "Sale recorded successfully", saleId: result.insertId });
    } catch (error) {
        return res.status(400).json({ error: error.message || error });
    }
};

// Req 4: Retrieve All Sales
const getAllSales = async (req, res) => {
    try {
        const [sales] = await connection.execute(`SELECT * FROM sales`);
        return res.status(200).json(sales);
    } catch (error) {
        return res.status(500).json({ error: error.message || error });
    }
};

// Req 4: Retrieve Sales for Specific Product
const getSalesByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const [sales] = await connection.execute(`SELECT * FROM sales WHERE ProductID = ?`, [productId]);
        return res.status(200).json(sales);
    } catch (error) {
        return res.status(400).json({ error: error.message || error });
    }
};

// Req 9: Total Quantity Sold per Product
const getTotalSoldPerProduct = async (req, res) => {
    try {
        const query = `
            SELECT p.ProductID, p.ProductName, COALESCE(SUM(s.QuantitySold), 0) AS TotalQuantitySold
            FROM products p
            LEFT JOIN sales s ON p.ProductID = s.ProductID
            GROUP BY p.ProductID, p.ProductName;
        `;
        const [reports] = await connection.execute(query);
        return res.status(200).json(reports);
    } catch (error) {
        return res.status(500).json({ error: error.message || error });
    }
};

// Req 10: Product with Highest Stock Quantity
const getHighestStockProduct = async (req, res) => {
    try {
        const [products] = await connection.execute(`SELECT * FROM products ORDER BY StockQuantity DESC LIMIT 1`);
        return res.status(200).json(products[0] || {});
    } catch (error) {
        return res.status(500).json({ error: error.message || error });
    }
};

// Req 11: Suppliers starting with 'F'
const getSuppliersStartingWithF = async (req, res) => {
    try {
        const [suppliers] = await connection.execute(`SELECT * FROM suppliers WHERE SupplierName LIKE 'F%'`);
        return res.status(200).json(suppliers);
    } catch (error) {
        return res.status(500).json({ error: error.message || error });
    }
};

// Req 12: Products never sold
const getUnsoldProducts = async (req, res) => {
    try {
        const query = `
            SELECT p.* 
            FROM products p 
            LEFT JOIN sales s ON p.ProductID = s.ProductID 
            WHERE s.SaleID IS NULL
        `;
        const [products] = await connection.execute(query);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message || error });
    }
};

// Req 13: Sales Details using JOIN
const getSalesWithProductDetails = async (req, res) => {
    try {
        const query = `
            SELECT p.ProductName, s.QuantitySold, s.SaleDate 
            FROM sales s 
            JOIN products p ON s.ProductID = p.ProductID
        `;
        const [sales] = await connection.execute(query);
        return res.status(200).json(sales);
    } catch (error) {
        return res.status(500).json({ error: error.message || error });
    }
};

module.exports = {
    recordSale,
    getAllSales,
    getSalesByProductId,
    getTotalSoldPerProduct,
    getHighestStockProduct,
    getSuppliersStartingWithF,
    getUnsoldProducts,
    getSalesWithProductDetails
};