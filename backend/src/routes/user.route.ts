import { Router } from 'express';

const router = Router();
const { authenticate } = require('../middlewares/auth.middlewares');

const { 
  getUser,
  getUsers, 
  getUsersSelections,
  createUser,
  updateUser,
  deleteUser,
  softDelete,
} = require('../controllers/user.controller');

router.get('/get-user/:id', authenticate, getUser);
router.get('/get-users', authenticate, getUsers);
router.get('/get-users-selections', authenticate, getUsersSelections);
router.post('/post-user', authenticate, createUser);
router.put('/put-user/:id', authenticate, updateUser);
router.put('/put-softdelete/:id', authenticate, softDelete);
router.delete('/delete-user/:id', authenticate, deleteUser);

module.exports = router;