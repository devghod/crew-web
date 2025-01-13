import { Request, Response } from 'express';
const InventoryModel = require('../models/inventory.model');

const getInventories = async (req: Request, res: Response) => {
  try {
    const inventories = await InventoryModel
      .find({ 
        deleted: false, 
      });

    res
      .status(200)
      .json({ 
        data: inventories, 
        total: inventories.length,
        success: true, 
        message: 'INVENTORIES' 
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

const createInventory = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newInventory = new InventoryModel({ ...body });
    const result = await newInventory.save();
    
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

const deleteInventory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await InventoryModel.findOneAndDelete({ _id: id });
    
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

const updateInventory = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = req.params.id;

    const updated = await InventoryModel
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
  getInventories, 
  createInventory,
  deleteInventory,
  updateInventory,
};