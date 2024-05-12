const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { 
  getConfigurations,
  addConfiguration, 
  updateConfiguration, 
} = require('../controllers/configurations.controller');

router.get('/get-configurations', authenticate, getConfigurations);
router.post('/post-configuration', authenticate, addConfiguration);
router.put('/put-configuration/:id', authenticate, updateConfiguration);

module.exports = router;