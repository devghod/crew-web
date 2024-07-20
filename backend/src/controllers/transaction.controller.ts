import { Request, Response } from 'express';
const TransactionModel = require('../models/transaction.model');

const collection = 'Transaction';

const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await TransactionModel
      .find({ 
        deleted: false, 
      });

    res
      .status(200)
      .json({ 
        data: transactions, 
        total: transactions.length,
        success: true, 
        message: 'TRANSACTIONS' 
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false, 
        message: `Error ${error}` 
      });
  };
};

const createTransaction = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newTransaction = new TransactionModel({ ...body });
    const result = await newTransaction.save();
    
    res
      .status(201)
      .json({ 
        data: result, 
        success: true, 
        message: 'CREATED' 
      });
  } catch (error) {
    res
      .status(500)
      .json({ 
        success: false, 
        message: `Error ${error}` 
      });
  };
};

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await TransactionModel.findOneAndDelete({ _id: id });
    
    if (!deleted) {
      res
      .status(404)
      .json({ 
        success: true, 
        message: 'Not data' 
      });
    };

    res
      .status(200)
      .json({ 
        success: true, 
        message: 'DELETED' 
      });
  } catch (error) {
    res
      .status(500)
      .json({ 
        success: false, 
        message: `Error ${error}` 
      });
  };
};

const updateTransaction = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = req.params.id;

    const updated = await TransactionModel
      .findOneAndUpdate(
        { _id: id }, 
        { ...body }, 
        { new: true, useFindAndModify: false }
      );
    
    if (!updated) {
      res
        .status(404)
        .json({ 
          success: false, 
          message: 'No data' 
        });
    };
    
    res
      .status(200)
      .json({ 
        data: updated, 
        success: true, 
        message: 'UPDATED' 
      });
  } catch (error) {
    res
      .status(500)
      .json({ 
        success: false, 
        message: `Error ${error}` 
      });
  };
};

module.exports = { 
  getTransactions, 
  createTransaction,
  deleteTransaction,
  updateTransaction,
};