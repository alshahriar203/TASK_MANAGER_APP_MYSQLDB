const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);

router.get('/', roleMiddleware(['admin']), userController.getUsers);
router.get('/:username', roleMiddleware(['admin']), userController.getUserByUsername);

module.exports = router;
