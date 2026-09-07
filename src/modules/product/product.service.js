const { connection } = require('../../DB/connectionDB.js');

// CRUD Operations
const createProduct = async (req, res) => {
    try {
        const { ProductName, Price, StockQuantity, SupplierID } = req.body;
        const query = `INSERT INTO products (ProductName, Price, StockQuantity, SupplierID) VALUES (?, ?, ?, ?)`;
        const [result] = await connection.execute(query, [ProductName, Price, StockQuantity || 0, SupplierID || null]);
        return res.status(201).json({ message: "Product created successfully", productId: result.insertId });
    } catch (error) {
        return res.status(400).json({ error: error.message || error });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const [products] = await connection.execute(`SELECT * FROM products`);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message || error });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const [products] = await connection.execute(`SELECT * FROM products WHERE ProductID = ?`, [id]);
        if (!products.length) return res.status(404).json({ message: "Product not found" });
        return res.status(200).json(products[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message || error });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { ProductName, Price, StockQuantity, SupplierID } = req.body;
        const query = `UPDATE products SET ProductName = ?, Price = ?, StockQuantity = ?, SupplierID = ? WHERE ProductID = ?`;
        const [result] = await connection.execute(query, [ProductName, Price, StockQuantity, SupplierID || null, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found or no changes made" });
        return res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        return res.status(400).json({ error: error.message || error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await connection.execute(`DELETE FROM products WHERE ProductID = ?`, [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(400).json({ error: error.message || error });
    }
};

// Alter Table Endpoints (Req 5)
const addCategoryColumn = async (req, res) => {
    try {
        await connection.query(`ALTER TABLE products ADD COLUMN Category VARCHAR(255)`);
        return res.status(200).json({ message: "Category column added successfully" });
    } catch (error) { return res.status(400).json({ error: error.message }); }
};

const removeCategoryColumn = async (req, res) => {
    try {
        await connection.query(`ALTER TABLE products DROP COLUMN Category`);
        return res.status(200).json({ message: "Category column removed successfully" });
    } catch (error) { return res.status(400).json({ error: error.message }); }
};

const modifyContactNumber = async (req, res) => {
    try {
        await connection.query(`ALTER TABLE suppliers MODIFY COLUMN ContactNumber VARCHAR(15)`);
        return res.status(200).json({ message: "ContactNumber modified successfully" });
    } catch (error) { return res.status(400).json({ error: error.message }); }
};

const addNotNullToProductName = async (req, res) => {
    try {
        await connection.query(`ALTER TABLE products MODIFY COLUMN ProductName VARCHAR(255) NOT NULL`);
        return res.status(200).json({ message: "NOT NULL constraint added to ProductName" });
    } catch (error) { return res.status(400).json({ error: error.message }); }
};

// Seed & Specific Updates (Req 6, 7, 8)
const seedData = async (req, res) => {
    try {
        const [sup] = await connection.execute(`INSERT INTO suppliers (SupplierName, ContactNumber) VALUES ('FreshFoods', '01001234567')`);
        const supplierId = sup.insertId;

        const [p1] = await connection.execute(`INSERT INTO products (ProductName, Price, StockQuantity, SupplierID) VALUES ('Milk', 15.00, 50, ?)`, [supplierId]);
        await connection.execute(`INSERT INTO products (ProductName, Price, StockQuantity, SupplierID) VALUES ('Bread', 10.00, 30, ?)`, [supplierId]);
        await connection.execute(`INSERT INTO products (ProductName, Price, StockQuantity, SupplierID) VALUES ('Eggs', 20.00, 40, ?)`, [supplierId]);

        await connection.execute(`INSERT INTO sales (ProductID, QuantitySold, SaleDate) VALUES (?, 2, '2025-05-20')`, [p1.insertId]);

        return res.status(201).json({ message: "Seed data inserted successfully" });
    } catch (error) { return res.status(400).json({ error: error.message }); }
};

const updateBreadPrice = async (req, res) => {
    try {
        await connection.execute(`UPDATE products SET Price = 25.00 WHERE ProductName = 'Bread'`);
        return res.status(200).json({ message: "Bread price updated to 25.00" });
    } catch (error) { return res.status(400).json({ error: error.message }); }
};

const deleteEggsProduct = async (req, res) => {
    try {
        await connection.execute(`DELETE FROM products WHERE ProductName = 'Eggs'`);
        return res.status(200).json({ message: "Product 'Eggs' deleted successfully" });
    } catch (error) { return res.status(400).json({ error: error.message }); }
};

module.exports = {
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
};