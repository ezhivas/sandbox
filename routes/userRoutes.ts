import express from 'express';

import {
    login,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/userController';



import validateUser from '../middleware/validationMiddleware';
import authMiddleware from '../middleware/authMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';

const router = express.Router();

router.post('/login', login);

router.use(authMiddleware);

router.post('/users', validateUser, createUser);
router.get('/users', roleMiddleware('admin'), getAllUsers);
router.get('/users/:id', roleMiddleware('admin'), getUserById);
router.put('/users/:id', roleMiddleware('admin'), validateUser, updateUser);
router.delete('/users/:id', roleMiddleware('admin'), deleteUser);

export default router;