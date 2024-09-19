import { Request, Response } from 'express';
const UserModel = require('../models/user.model');

const getUser = async (req: Request, res: Response) => {
  try {

    const user = await UserModel.find({ 
      _id: req.params.id,
      // status: "active" ,
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

const getUsers = async (req: Request, res: Response) => {
  try {

    const users = await UserModel.find({ 
      // status: "active" ,
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

const getUsersSelections = async (req: Request, res: Response) => {
  const { selections } = req.body;

  try {

    const users = await UserModel.find({ 
      status: "active" ,
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

module.exports = { 
  getUser,
  getUsers,
  getUsersSelections,
};