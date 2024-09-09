import { Request, Response } from 'express';
const UserModel = require('../models/user.model');

const postLogin = async (req: Request, res: Response) => {
  try {
    
    res
      .status(200)
      .json({ 
        logs: [], 
        success: true, 
        message: 'LOGS' 
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
  postLogin,
};