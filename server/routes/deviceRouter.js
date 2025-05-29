import deviceController from "../controllers/deviceController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import { Router } from "express";

const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

export default router;