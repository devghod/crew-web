import { Request, Response } from 'express';
import InventoryModel from '../models/inventory.model';
import InventoryLogModel from '../models/inventory-log.model';

const controller = 'Inventory';

const getInventories = async (req: Request, res: Response): Promise<void> => {
  try {
    const inventories = await InventoryModel
      .find({ deleted: false })
      .populate(
        'inventory_product_id', 
        'product_name product_brand product_description product_price'
      )
      .exec();

    const reconstructInventories = inventories.map((inventory: any) => ({
      "inventory_product_id": inventory.inventory_product_id?._id || null,
      "product_name": inventory.inventory_product_id?.product_name || null,
      "product_brand": inventory.inventory_product_id?.product_brand || null,
      "product_description": inventory.inventory_product_id?.product_description || null,
      "inventory_product_availability": inventory.inventory_product_availability,
      "product_price": inventory.inventory_product_id?.product_price || null,
    }));

    res.status(200).json({ 
      data: reconstructInventories, 
      total: reconstructInventories.length,
      success: true, 
      message: `${controller} retrieve successfully`
    });
  } catch (error) {
    res.status(500).json({
        success: false, 
        message: `Error retrieve ${controller} ${error}` 
      });
  };
};

const createInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const newInventory = new InventoryModel({ ...body });
    const result = await newInventory.save();

    if (!result) {
      throw new Error(`Internal error created ${controller}`);
    };
    
    res.status(201).json({ 
      data: result, 
      success: true, 
      message: `${controller} created successfully` 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: `Error created ${controller} ${error}` 
    });
  };
};

const deleteInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const deleted = await InventoryModel.findOneAndDelete({ _id: id });
    
    if (!deleted) {
      throw new Error(`${controller} not exist`);
    };

    res.status(200).json({ 
      success: true, 
      message: `Deleted ${controller} successfully`
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: `Error deleted ${controller} ${error}` 
    });
  };
};

const updateInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const id = req.params.id;

    const updated = await InventoryModel.findOneAndUpdate(
      { _id: id }, 
      { ...body }, 
      { new: true, useFindAndModify: false }
    );
    
    if (!updated) {
      throw new Error(`${controller} not exist`);
    };
    
    res.status(200).json({ 
      data: updated, 
      success: true, 
      message: `Updated ${controller} successfully`
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: `Error updated ${controller} ${error}` 
    });
  };
};

const updateInventoryQuantity = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const quantityChange = req.body.quantity; // postive number for add and negtive number for minus

    const updatedInventory = await InventoryModel.findOneAndUpdate(
      { inventory_product_id: id }, 
      { $inc: { inventory_product_availability: quantityChange } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedInventory) {
      throw new Error(`Not found`);
    };

    if (updatedInventory.inventory_product_availability < 0) {
      throw new Error('Insufficient');
    };

    await InventoryLogModel.create(
      [
        {
          inventoryLog_inventory_id: updatedInventory._id,
          inventoryLog_transaction_type: quantityChange > 0 ? 'in' : 'out',
          inventoryLog_quantity: Math.abs(quantityChange),
        },
      ],
    );

    res.status(200).json({ 
      data: updatedInventory, 
      success: true, 
      message: `Updated ${controller} quantity successfully`
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: `Error updated ${controller} ${error}` 
    });
  };
};

module.exports = { 
  getInventories, 
  createInventory,
  deleteInventory,
  updateInventory,
  updateInventoryQuantity,
};