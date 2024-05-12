const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsersModel = require('../models/users.model');

// Register a new user
const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UsersModel({ username, email, password: hashedPassword });
    await user.save();

    res
      .status(400)
      .json({ 
        success: true,
        message: 'Registration successful' 
      });
  
  } catch (error) {
    next(error);
  }
}

// Login with an existing user
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await UsersModel.findOne({ username, status: "Active" });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.json({ success: false, message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour'
    });

    res.json({ 
      success: true,
      token: token 
    });
  
  } catch (error) {
    next(error);
  }
}

// Verify token
const verify = async (req, res, next) => {
  const { token } = req.body;

  try {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        res
          .json({ 
            success: false, 
            message: `Token verification failed: ${err.message}` 
          });
      } else {
        const id = decoded.userId;
        const user = await UsersModel
          .findOne({ _id: id })
          .select({ 
            first_name: 1, 
            middle_name: 1, 
            last_name: 1, 
            email: 1,
            status: 1,
            username: 1,
            date_created: 1,
            image: 1
          });
        
        res.json({ 
          success: true, 
          decoded: decoded, 
          profile: user, 
          message: `Decoded Token` 
        });
      
      }
    });

  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, verify }