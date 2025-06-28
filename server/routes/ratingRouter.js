import { Router } from 'express';
import ratingController from '../controllers/ratingController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/', authMiddleware, ratingController.addRating);

export default router;
