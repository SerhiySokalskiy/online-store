import { Router } from 'express';
import BasketController from '../controllers/basketController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/add', authMiddleware, BasketController.add);
router.get('/', authMiddleware, BasketController.get);
router.delete('/:basketDeviceId', authMiddleware, BasketController.remove);

export default router;
