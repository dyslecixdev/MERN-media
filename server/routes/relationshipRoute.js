import express from 'express';
import {
	createRelationship,
	getFollowerRelationships,
	getFollowedRelationships,
	deleteRelationship
} from '../controllers/relationshipController.js';

const router = express.Router();

router.post('/', createRelationship);
router.get('/follower', getFollowerRelationships);
router.get('/followed', getFollowedRelationships);
router.delete('/', deleteRelationship);

export default router;
