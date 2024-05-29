const db = require('./db');

const User = {

    getAllUsers: async () => {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    },

    findByUsername: async (username) => {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    },

    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    createUser: async (username, email, password, role) => {
        await db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, role]);
        return username; 
    }
};

module.exports = User;
