import express from 'express';
// Импортируем функции из контроллера (обрати внимание на login)
import {
    login,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/userController';

const validateUser = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/login', login);

router.use(authMiddleware);

router.post('/users', validateUser, createUser);
router.get('/users', roleMiddleware('admin'), getAllUsers);
router.get('/users/:id', roleMiddleware('admin'), getUserById);
router.put('/users/:id', roleMiddleware('admin'), validateUser, updateUser);
router.delete('/users/:id', roleMiddleware('admin'), deleteUser);

export default router;