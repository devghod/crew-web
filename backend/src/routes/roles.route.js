const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { 
  getRoles, 
  getRoleById, 
  getRolesByFilter,
  addRole, 
  updateRole, 
  deleteRole,
  updateRoleStatus
} = require('../controllers/roles.controller');

router.get('/get-roles', authenticate, getRoles);
router.get('/get-role/:id', authenticate, getRoleById);
router.post('/post-roles', authenticate, getRolesByFilter);
router.post('/post-role', authenticate, addRole);
router.put('/put-role/:id', authenticate, updateRole);
router.put('/put-role/status/:id', authenticate, updateRoleStatus);
router.delete('/delete-role/:id', authenticate, deleteRole);

module.exports = router;