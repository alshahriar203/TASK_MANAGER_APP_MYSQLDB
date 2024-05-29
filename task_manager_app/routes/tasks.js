const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);


router.get('/', roleMiddleware(['admin', 'user']), taskController.getTasks);
router.get('/:id', roleMiddleware(['admin', 'user']), taskController.getTaskById);

router.post('/', roleMiddleware(['user', 'admin']), taskController.createTask);
router.patch('/:id', roleMiddleware(['user', 'admin']), taskController.updateTaskStatus);
router.delete('/:id', roleMiddleware(['user', 'admin']), taskController.deleteTask);

module.exports = router;
