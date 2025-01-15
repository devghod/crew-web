import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middlewares';
import { 
  getInventories, 
  createInventory,
  deleteInventory,
  updateInventory,
  updateInventoryQuantity,
} from '../controllers/inventory.controller';

const router = Router();

router.get('/get-inventories', getInventories);
router.post('/create-inventory', createInventory);
router.delete('/delete-inventory/:id', deleteInventory);
router.put('/update-inventory/:id', updateInventory);
router.put('/update-inventory-quantity/:id', authenticate, updateInventoryQuantity);

module.exports = router;