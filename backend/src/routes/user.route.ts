import { Router } from 'express';

const router = Router();
const { authenticate } = require('../middlewares/auth.middlewares');

const { 
  getUser,
  getUsers, 
  getUsersSelections
} = require('../controllers/user.controller');

router.get('/get-user/:id', authenticate, getUser);
router.get('/get-users', authenticate, getUsers);
router.get('/get-users-selections', authenticate, getUsersSelections);

module.exports = router;