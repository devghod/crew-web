import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const authenticate = async (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

//     req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ 
        message: 'Invalid token' 
      });
  }
};

module.exports = { 
  authenticate, 
};