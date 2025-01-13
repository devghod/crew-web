import { Request, Response } from 'express';
const ProductModel = require('../models/product.model');

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel
      .find({ 
        deleted: false, 
      });

    res
      .status(200)
      .json({ 
        data: products, 
        total: products.length,
        success: true, 
        message: 'PRODUCTS' 
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

const createProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newProduct = new ProductModel({ ...body });
    const result = await newProduct.save();
    
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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await ProductModel.findOneAndDelete({ _id: id });
    
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = req.params.id;

    const updated = await ProductModel
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
  getProducts, 
  createProduct,
  deleteProduct,
  updateProduct,
};