import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';
const jwt = require('jsonwebtoken');

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  };

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findById(decodedToken.userId);

    if (!user) {
      throw new Error('User not found');
    };

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: error });
  };
};

export {
  authenticate
};