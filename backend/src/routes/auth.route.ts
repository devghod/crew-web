import { Router } from 'express';

const router = Router();

const { 
  login, 
  register,
  verify,
} = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/register', register);
router.post('/verify', verify);

module.exports = router;