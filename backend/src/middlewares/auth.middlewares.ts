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
      throw new Error('User not found');
    }

    // req.user = decodedToken;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ 
        message: 'Invalid token' 
      });
  }
};

export {
  authenticate
};