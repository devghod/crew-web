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
router.delete('/delete-inventory/:inventoryId', deleteInventory);
router.put('/update-inventory/:inventoryId', updateInventory);
router.put('/update-inventory-stock/:productId', updateInventoryQuantity);

module.exports = router;