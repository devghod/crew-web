const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { 
  getLogs, 
  getLogsPaginate
} = require('../controllers/logs.controller');

router.get('/get-logs', authenticate, getLogs);
router.post('/post-logs', authenticate, getLogsPaginate);

module.exports = router;