import { Request, Response } from 'express';
import ProductModel from '../models/product.model';
import InventoryModel from '../models/inventory.model';

const controller = 'Product';

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductModel.find({ deleted: false });

    res.status(200).json({ 
      data: products, 
      total: products.length,
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

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const dataProduct = new ProductModel({ ...body });
    const newProduct = await dataProduct.save();

    if (!newProduct) {
      throw new Error(`Internal error created ${controller}`);
    };

    const dataInventory = new InventoryModel({
      "inventory_product_id": newProduct._id,
      "inventory_product_availability": 0
    });
    const newInventory = await dataInventory.save();

    if (!newInventory) {
      throw new Error(`Internal error created ${controller}`);
    };
    
    res.status(201).json({ 
      data: newProduct, 
      success: true, 
      message: `${controller} created Successfully`
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: `Error created ${controller} ${error}` 
    });
  };
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const deleted = await ProductModel.findOneAndDelete({ _id: id });
    
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

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const id = req.params.id;

    const updated = await ProductModel.findOneAndUpdate(
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

module.exports = { 
  getProducts, 
  createProduct,
  deleteProduct,
  updateProduct,
};