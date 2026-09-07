const { connection } = require('../../DB/connectionDB.js');

// Create Supplier
const createSupplier = async (req, res) => {
    try {
        const { SupplierName, ContactNumber } = req.body;
        const [result] = await connection.execute(
            `INSERT INTO suppliers (SupplierName, ContactNumber) VALUES (?, ?)`,
            [SupplierName, ContactNumber]
        );
        return res.status(201).json({ message: "Supplier created", supplierId: result.insertId });
    } catch (error) {
        return res.status(400).json({ error: error.message || error });
    }
};

// Retrieve All Suppliers
const getAllSuppliers = async (req, res) => {
    try {
        const [suppliers] = await connection.execute(`SELECT * FROM suppliers`);
        return res.status(200).json(suppliers);
    } catch (error) {
        return res.status(500).json({ error: error.message || error });
    }
};

// Update Supplier
const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { SupplierName, ContactNumber } = req.body;
        const [result] = await connection.execute(
            `UPDATE suppliers SET SupplierName = ?, ContactNumber = ? WHERE SupplierID = ?`,
            [SupplierName, ContactNumber, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: "Supplier not found" });
        return res.status(200).json({ message: "Supplier updated successfully" });
    } catch (error) {
        return res.status(400).json({ error: error.message || error });
    }
};

// Delete Supplier
const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await connection.execute(`DELETE FROM suppliers WHERE SupplierID = ?`, [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Supplier not found" });
        return res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (error) {
        return res.status(400).json({ error: error.message || error });
    }
};

module.exports = { createSupplier, getAllSuppliers, updateSupplier, deleteSupplier };