import { Router } from 'express';
const router = Router();

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