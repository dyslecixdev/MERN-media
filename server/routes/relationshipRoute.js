import express from 'express';
import {
	createRelationship,
	getRelationships,
	deleteRelationship
} from '../controllers/relationshipController.js';

const router = express.Router();

router.post('/', createRelationship);
router.get('/', getRelationships);
router.delete('/', deleteRelationship);

export default router;
