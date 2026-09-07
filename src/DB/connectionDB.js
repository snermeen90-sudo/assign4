const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'assign4',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const connected_db = async (app, port) => {
    try {
        await connection.getConnection();
        console.log("Database 'assign4' connected successfully.");

        if (app && port) {
            app.listen(port, () => {
                console.log(`Server running on http://localhost:${port}`);
            });
        }
    } catch (error) {
        console.error("Failed to connect to Database:", error.message || error);
    }
};

module.exports = { connected_db, connection };