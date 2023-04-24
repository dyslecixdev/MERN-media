import express from 'express';
import {createComment, getPostComments, getUserComments} from '../controllers/commentController.js';

const router = express.Router();

router.post('/', createComment);
router.get('/post', getPostComments);
router.get('/user', getUserComments);

export default router;
