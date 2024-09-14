import { Router } from 'express';

const router = Router();

const { 
  getInventories, 
  createInventory,
  deleteInventory,
  updateInventory,
} = require('../controllers/inventory.controller');

router.get('/get-inventories', getInventories);
router.post('/post-inventory', createInventory);
router.delete('/delete-inventory/:id', deleteInventory);
router.put('/put-inventory/:id', updateInventory);

module.exports = router;