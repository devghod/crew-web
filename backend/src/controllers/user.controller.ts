import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

export const getUser = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const user = await UserModel.find({ 
      _id: id,
      // status: "active" ,
      deleted_at: { $eq: null },
    });

    res
      .status(200)
      .json({ 
        success: true,
        message: "User",
        data: user
      });
  
  } catch (error) {
    res
      .status(500)
      .json({
        success: false, 
        message: `Error ${error}` 
      });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {

    const users = await UserModel.find({ 
      // status: "active" ,
      deleted_at: { $eq: null },
    });

    res
      .status(200)
      .json({ 
        success: true,
        message: "Users",
        data: users
      });
  
  } catch (error) {
    res
      .status(500)
      .json({
        success: false, 
        message: `Error ${error}` 
      });
  }
};

export const postUsersList = async (req: Request, res: Response) => {
  try {
    const { size, page } = req.body;

    const users = await UserModel.find({ 
        deleted_at: { $eq: null },
      })
      .skip((page - 1) * size)
      .limit(size);

    res
      .status(200)
      .json({ 
        success: true,
        message: "Users List Paginated",
        data: users,
        size: size,
        page: page,
      });
  
  } catch (error) {
    res
      .status(500)
      .json({
        success: false, 
        message: `Error ${error}` 
      });
  }
};

export const getUsersSelections = async (req: Request, res: Response) => {
  try {

    const { selections } = req.body;

    const users = await UserModel.find({ 
      // status: "active" ,
      deleted_at: { $eq: null },
    })
    .select(selections);

    res
      .status(200)
      .json({ 
        success: true,
        message: "Users Selections",
        data: users
      });
  
  } catch (error) {
    res
      .status(500)
      .json({
        success: false, 
        message: `Error ${error}` 
      });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { 
      username, 
      password: tempPassword, 
      email 
    } = body;
    let password = tempPassword;

    const existed = await UserModel.aggregate([
      {
        $match: {
          $or: [
            { username: username },
            { email: email },
          ]
        }
      }
    ]);

    if (existed.length > 0) {
      return res
        .status(400)
        .json({ message: 'Username or email already exists' });
    }

    if (password === '') {
      password = 'Admin@123'; // default password
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, email, password: hashedPassword });
    const result = await user.save();
    
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const updated = await UserModel
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await UserModel
      .findOneAndDelete({ _id: id });
    
    if (!deleted) {
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
        data: deleted, 
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
  }
}; 

export const softDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentDate = new Date().toISOString();

    const updated = await UserModel
      .findOneAndUpdate(
        { _id: id }, 
        { deleted_at: currentDate }, 
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
  }
}; 