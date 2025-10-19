import { Request, Router } from 'express';
import { userController } from '../controllers/user.controller';
import { validateUser } from '../../../middleware/validation';
import { requireAdmin, requiredAuth } from '../../../middleware/auth';
import { authController } from '../../auth/controllers/auth.controller';

const router = Router();

router.get('/', requiredAuth, requireAdmin, (req, res) => userController.getUsers(req, res));
router.get('/:id', requiredAuth, (req, res) => userController.getUser(req, res));
router.put('/:id', requiredAuth, (req, res) => userController.deleteUser(req, res));

export default router;
