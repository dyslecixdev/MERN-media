import express from 'express';
import {createLike, getLikes, deleteLike} from '../controllers/likeController.js';

const router = express.Router();

router.post('/', createLike);
router.get('/', getLikes);
router.delete('/', deleteLike);

export default router;
