const db = require('./db');

const Task = {
    getAllTasks: async () => {
        const [rows] = await db.query('SELECT * FROM tasks');
        return rows;
    },

    getTaskById: async (taskId) => {
        const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
        return rows[0];
    },

    createTask: async (title, description, status, username) => {
        const [result] = await db.query('INSERT INTO tasks (title, description, status, username) VALUES (?, ?, ?, ?)', [title, description, status, username]);
        return result.insertId;
    },

    updateTaskStatus: async (taskId, status) => {
        const [result] = await db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, taskId]);
        return result;
    },

    deleteTask: async (taskId, userId) => {
        const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
        return result;
    }
};

module.exports = Task;
