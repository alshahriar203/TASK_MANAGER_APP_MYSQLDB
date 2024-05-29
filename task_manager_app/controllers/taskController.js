const Task = require('../models/Task');

exports.getTasks = async (req, res, next) => {
    try {
        let tasks = [];

        if (req.userData.role === 'user') {
            tasks = await Task.getAllTasks();
            tasks = tasks.filter(task => task.username === req.userData.username);
        } else if (req.userData.role === 'admin') {
            tasks = await Task.getAllTasks();

            if (req.query.status) {
                tasks = tasks.filter(task => task.status === req.query.status);
            }
        }

        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.getTaskById = async (req, res, next) => {
    const taskId = req.params.id;

    try {
        const task = await Task.getTaskById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (req.userData.role !== 'admin' && task.username !== req.userData.username) {
            return res.status(403).json({ message: 'Access forbidden: you can only view your own tasks' });
        }

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    const { title, description, status } = req.body;

    try {
        const taskId = await Task.createTask(title, description, status, req.userData.username);

        res.status(201).json({ message: 'Task created successfully', taskId });
    } catch (error) {
        next(error);
    }
};

exports.updateTaskStatus = async (req, res, next) => {
    const taskId = req.params.id;
    const { status } = req.body;

    try {
        const task = await Task.getTaskById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (req.userData.role !== 'admin' && task.username !== req.userData.username) {
            return res.status(403).json({ message: 'Access forbidden: you can only edit your own tasks' });
        }

        await Task.updateTaskStatus(taskId, status);

        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    const taskId = req.params.id;

    try {
        const task = await Task.getTaskById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (req.userData.role !== 'admin' && task.username !== req.userData.username) {
            return res.status(403).json({ message: 'Access forbidden: you can only delete your own tasks' });
        }

        await Task.deleteTask(taskId);

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};
