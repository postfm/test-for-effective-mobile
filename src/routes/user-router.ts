import { Request, Router } from 'express';
import { userController } from '../controllers/user-controller';
import { validateUser } from '../middleware/validation';

const router = Router();

router.get('/', (req, res) => userController.getUsers(req, res));
router.get('/:id', (req, res) => userController.getUser(req, res));
router.post('/', validateUser, (req: Request, res) => userController.createUser(req, res));
router.put('/:id', validateUser, (req: Request, res) => userController.updateUser(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));

export default router;
