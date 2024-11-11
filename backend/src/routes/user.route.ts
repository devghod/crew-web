import { Router } from 'express';

const router = Router();
const { authenticate } = require('../middlewares/auth.middlewares');

const { 
  getUser,
  getUsers, 
  getUsersStatistics,
  getUsersSelections,
  postUsersList,
  createUser,
  updateUser,
  deleteUser,
  softDelete,
} = require('../controllers/user.controller');

router.get('/get-user/:id', authenticate, getUser);
router.get('/get-users', authenticate, getUsers);
router.get('/get-users-statistics', authenticate, getUsersStatistics);
router.get('/get-users-selections', authenticate, getUsersSelections);
router.post('/post-users-list', authenticate, postUsersList);
router.post('/create-user', authenticate, createUser);
router.put('/update-user/:id', authenticate, updateUser);
router.put('/put-softdelete/:id', authenticate, softDelete);
router.delete('/delete-user/:id', authenticate, deleteUser);

module.exports = router;