import express from 'express';
import {getUser, getAllUsers, updateUser} from '../controllers/userController.js';

const router = express.Router();

router.get('/:userId', getUser);
router.get('/all/:userId', getAllUsers);
router.put('/:userId', updateUser);

export default router;
