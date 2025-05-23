import { Request, Response } from 'express';
const DebtModel = require('../models/debt.model');
const LogModel = require('../models/log.model');

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
      .status(500)
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
      .status(500)
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

    if (result) {
      new LogModel({
        model: 'Debt',
        id_in_table: result._id,
        action: 'CREATE',
        description: 'Debt created',
        // user_id_execute: req.user.id, // assuming req.user.id is the user who made the request
        new_data: result,
        old_data: {},
      }).save();
    };
    
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

const deleteDebt = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await DebtModel.findOneAndDelete({ _id: id });
    
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

const updateDebt = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = req.params.id;

    const updated = await DebtModel
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

const updateDebtStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    let statusChange = "";

    const temp = await DebtModel
      .findOne({ _id: id })
      .select({ status: 1 });

    if (!temp) {
      res
        .status(404)
        .json({ 
          success: false, 
          message: 'Not found' 
        });
    };

    if (temp.status.toLowerCase() === "paid") {
      statusChange = "Unpaid";
    } else {
      statusChange = "Paid";
    };

    const debt = await DebtModel
      .findOneAndUpdate(
        { _id: id }, 
        { status: statusChange }, 
        { new: true, useFindAndModify: false }
      );
    
    res
      .status(200)
      .json({ 
        data: debt, 
        success: true, 
        message: 'STATUS UPDATED' 
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

const getDebtStats = async (req: Request, res: Response) => {
  try {
    const debts = await DebtModel.aggregate([
      {
        $match: { deleted: false }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);
    
    const result = debts.reduce((acc: any, curr: any) => {
      acc[curr._id === 'Paid' ? 'paid' : curr._id === 'Unpaid' ? 'unpaid' : 'total'] = curr.count;
      return acc;
    }, { total: 0, paid: 0, unpaid: 0 });
    

    const data = {
      total: result.total + result.paid + result.unpaid,
      paid: result.paid,
      unpaid: result.unpaid
    };

    res
      .status(200)
      .json({ 
        data: data, 
        success: true, 
        message: 'DEBTS Statistics' 
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
  getDebts, 
  getDebtStats,
  getDebtById, 
  createDebt,
  deleteDebt,
  updateDebt,
  updateDebtStatus,
};