const express = require('express');
const router = express.Router();
const { 
  addUser, 
  updateUser, 
  deleteUser,
} = require('../controllers/testController');

router.post('/post-user', addUser);
router.put('/put-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

module.exports = router;