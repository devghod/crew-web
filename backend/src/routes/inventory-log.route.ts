import { Router } from 'express';

const router = Router();

const { 
  getInventories, 
  createInventory,
  deleteInventory,
  updateInventory,
} = require('../controllers/inventory-log.controller');

router.get('/get-inventory-log', getInventories);
router.post('/create-inventory-log', createInventory);
router.delete('/delete-inventory-log/:id', deleteInventory);
router.put('/update-inventory-log/:id', updateInventory);

module.exports = router;