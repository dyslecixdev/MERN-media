import express from 'express';
import {createChat, getChats} from '../controllers/chatController.js';

const router = express.Router();

router.post('/', createChat);
router.get('/', getChats);

export default router;
