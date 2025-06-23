import { Request, Response } from 'express';
import UserModel from '../models/user.model';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {

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
        .json({ 
          success: false, 
          message: 'Username or email already exists' 
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, email, password: hashedPassword });
    await user.save();

    res
      .status(200)
      .json({ 
        success: true,
        message: 'Registration successful' 
      });
  
  } catch (error) {
    res
      .status(500)
      .json({
        success: false, 
        message: `Error ${error}` 
      });
  }
}

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {

    // username can be either username, email, mobile
    const user = await UserModel.findOne({ 
      $or: [
        { username: username },
        { email: username },
        { mobile: username },
      ],
      status: "active" 
    });

    if (!user) {
      return res
        .status(400)
        .json({ 
          success: false, 
          message: 'User not found or inactive' 
        });
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ 
          success: false, 
          message: 'Invalid login credentials.' 
        });
    }

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.SECRET_KEY, 
      { expiresIn: '1 hour'});

    const refreshToken = jwt.sign(
      { userId: user._id }, 
      process.env.REFRESH_SECRET_KEY, 
      { expiresIn: '10h'});

    res
      .status(200)
      .json({ 
        success: true,
        token: token,
        tokenExpIn: new Date(Date.now() + 60 * 60 * 1000), // 1hr
        refreshToken: refreshToken,
        refreshTokenExpIn: new Date(Date.now() + 10 * 60 * 60 * 1000), // 10hrs
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

// Verify token
const verify = async (req: Request, res: Response) => {
  const { token, refreshToken } = req.body;

  try {

    jwt.verify(
      token, 
      process.env.SECRET_KEY, 
      async (error: any, decoded: any) => {
        if (error) {
          if (
            error?.name && 
            error.name === 'TokenExpiredError' &&
            error?.message &&
            error.message === 'jwt expired'
          ) {
            jwt.verify(
              refreshToken, 
              process.env.REFRESH_SECRET_KEY, 
              async (error: any, decoded: any) => {
                if (error) {
                  res
                    .status(400)
                    .json({ 
                      success: false, 
                      message: `Token verification failed: ${error.message}` 
                    });
                } else {
                  const id = decoded.userId;
                  const user = await UserModel
                    .findOne({ _id: id })
                    .select({ 
                      first_name: 1, 
                      middle_name: 1, 
                      last_name: 1, 
                      email: 1,
                      status: 1,
                      username: 1,
                      date_created: 1,
                      image: 1,
                      gender: 1,
                    });

                  const newToken = jwt.sign(
                    { userId: user._id }, 
                    process.env.SECRET_KEY, 
                    { expiresIn: '1 hour'});

                  res
                    .status(200)
                    .json({ 
                      success: true, 
                      decoded: decoded,
                      accessToken: newToken, 
                      refreshToken: refreshToken,
                      profile: user, 
                      message: `Decoded Token` 
                    });
                }
              });
          } else {
            res
              .status(400)
              .json({ 
                success: false, 
                message: `Token verification failed: ${error.message}` 
              });
          }
        } else {
          const id = decoded.userId;
          const user = await UserModel
            .findOne({ _id: id })
            .select({ 
              first_name: 1, 
              middle_name: 1, 
              last_name: 1, 
              email: 1,
              status: 1,
              username: 1,
              date_created: 1,
              image: 1,
              gender: 1,
            });

          res
            .status(200)
            .json({ 
              success: true, 
              accessToken: token,
              refreshToken: refreshToken,
              decoded: decoded, 
              profile: user, 
              message: `Decoded Token` 
            });
        }
    });

  } catch (error) {
    res
      .status(500)
      .json({
        success: false, 
        message: `Error ${error}` 
      });
  }
}

module.exports = { 
  login,
  register,
  verify,
};