const DebtModel = require('../models/debt.model');
import { Request, Response } from 'express';

const getDebts = async (req: Request, res: Response) => {
  try {
    const debts = await DebtModel
      .find({ 
        deleted: false, 
      });

    res
      .status(200)
      .json({ 
        data: debts, 
        total: debts.length,
        success: true, 
        message: 'DEBTS' 
      });

  } catch (error) {
    res
      .status(400)
      .json({
        success: false, 
        message: `Error ${error}` 
      });
  };
};

const getDebtById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const debt = await DebtModel
      .findOne({ _id: id });

    res
      .status(200)
      .json({ 
        data: debt, 
        success: true, 
        message: 'DEBT' 
      });
  } catch (error) {
    res
      .status(400)
      .json({ 
        success: false, 
        message: `Error ${error}` 
      });
  };
};

const createDebt = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newDebt = new DebtModel({ ...body });
    const result = await newDebt.save();
    
    res
      .status(201)
      .json({ 
        data: result, 
        success: true, 
        message: 'CREATED' 
      });
      
  } catch (error) {
    res
      .status(400)
      .json({ 
        success: false, 
        message: `Error ${error}` 
      });
  };
};

module.exports = { 
  getDebts, 
  getDebtById, 
  createDebt,
};