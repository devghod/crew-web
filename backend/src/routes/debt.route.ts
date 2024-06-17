const express = require('express');
const router = express.Router();
const { 
  getDebts, 
  getDebtById, 
  createDebt,
} = require('../controllers/debt.controller');

router.get('/get-debts', getDebts);
router.get('/get-debt/:id', getDebtById);
router.post('/post-debt', createDebt);

module.exports = router;