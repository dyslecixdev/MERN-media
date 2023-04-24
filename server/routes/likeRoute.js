import express from 'express';
import {createLike, getPostLikes, getUserLikes, deleteLike} from '../controllers/likeController.js';

const router = express.Router();

router.post('/', createLike);
router.get('/post', getPostLikes);
router.get('/user', getUserLikes);
router.delete('/', deleteLike);

export default router;
