import { Request, Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validateUser } from '../../../middleware/validation';

const router = Router();

router.post('/register', validateUser, (req: Request, res) => authController.register(req, res));
router.post('/login', validateUser, (req: Request, res) => authController.login(req, res));

export default router;
