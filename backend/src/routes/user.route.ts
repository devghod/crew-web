import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middlewares';
import { 
  getUser,
  getUsers, 
  getUsersStatistics,
  getUsersSelections,
  postUsersList,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  softDelete,
} from '../controllers/user.controller';

const router = Router();

router.get('/get-user/:id', authenticate, getUser);
router.get('/get-users', authenticate, getUsers);
router.get('/get-users-statistics', authenticate, getUsersStatistics);
router.get('/get-users-selections', authenticate, getUsersSelections);
router.post('/post-users-list', authenticate, postUsersList);
router.post('/create-user', authenticate, createUser);
router.put('/update-user/:id', authenticate, updateUser);
router.put('/update-user-password/:id', authenticate, updateUserPassword);
router.put('/put-softdelete/:id', authenticate, softDelete);
router.delete('/delete-user/:id', authenticate, deleteUser);

module.exports = router;