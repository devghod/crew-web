const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { 
  getUsers, 
  getUserById, 
  getUsersStatistics,
  getUsersByFilter,
  addUser, 
  updateUser, 
  deleteUser,
  updateUserStatus
} = require('../controllers/users.controller');

router.get('/get-users', authenticate, getUsers);
router.get('/get-users/statistics', authenticate, getUsersStatistics);
router.get('/get-user/:id', authenticate, getUserById);
router.post('/post-users', authenticate, getUsersByFilter);
router.post('/post-user', authenticate, addUser);
router.put('/put-user/:id', authenticate, updateUser);
router.put('/put-user/status/:id', authenticate, updateUserStatus);
router.delete('/delete-user/:id', authenticate, deleteUser);

module.exports = router;