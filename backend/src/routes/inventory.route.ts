import { Router } from 'express';

const router = Router();

const { 
  getInventories, 
  createInventory,
  deleteInventory,
  updateInventory,
  updateInventoryQuantity,
} = require('../controllers/inventory.controller');

router.get('/get-inventories', getInventories);
router.post('/create-inventory', createInventory);
router.delete('/delete-inventory/:id', deleteInventory);
router.put('/update-inventory/:id', updateInventory);
router.put('/update-inventory-quantity/:id', updateInventoryQuantity);

module.exports = router;