import express from 'express';
import {createComment, getComments} from '../controllers/commentController.js';

const router = express.Router();

router.post('/', createComment);
router.get('/', getComments);

export default router;
