import { Router } from 'express';
const router = Router();

const { 
  getDebts, 
  getDebtStats,
  getDebtById, 
  createDebt,
  deleteDebt,
  updateDebt,
  updateDebtStatus,
} = require('../controllers/debt.controller');

router.get('/get-debts', getDebts);
router.get('/get-debts-stats', getDebtStats);
router.get('/get-debt/:id', getDebtById);
router.post('/post-debt', createDebt);
router.delete('/delete-debt/:id', deleteDebt);
router.put('/put-debt/:id', updateDebt);
router.put('/put-debt/status/:id', updateDebtStatus);

const { 
  getProducts, 
  createProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/product.controller');

router.get('/get-products', getProducts);
router.post('/post-product', createProduct);
router.delete('/delete-product/:id', deleteProduct);
router.put('/put-product/:id', updateProduct);

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

const { 
  getTransactions, 
  createTransaction,
  deleteTransaction,
  updateTransaction,
} = require('../controllers/transaction.controller');

router.get('/get-transactions', getTransactions);
router.post('/post-transaction', createTransaction);
router.delete('/delete-transaction/:id', deleteTransaction);
router.put('/put-transaction/:id', updateTransaction);

module.exports = router;