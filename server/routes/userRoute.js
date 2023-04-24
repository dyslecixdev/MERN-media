import express from 'express';
import {getUser, updateUser, deleteUser} from '../controllers/userController.js';

const router = express.Router();

router.get('/:userId', getUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
