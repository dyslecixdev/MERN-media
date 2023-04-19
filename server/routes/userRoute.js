import express from 'express';
import {testMessage} from '../controllers/userController.js';

const router = express.Router();

router.get('/test', testMessage);

export default router;
