const express = require('express');
const router = express.Router();
const { 
  getDebts, 
  getDebtById, 
  createDebt,
  deleteDebt,
  updateDebt,
  updateDebtStatus,
} = require('../controllers/debt.controller');

router.get('/get-debts', getDebts);
router.get('/get-debt/:id', getDebtById);
router.post('/post-debt', createDebt);
router.delete('/delete-debt/:id', deleteDebt);
router.put('/put-debt/:id', updateDebt);
router.put('/put-debt/status/:id', updateDebtStatus);

module.exports = router;