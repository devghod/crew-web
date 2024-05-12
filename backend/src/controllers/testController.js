const UsersModel = require('../models/users.model');

const addUser = async (req, res, next) => {
  try {
    const body = req.body;
    const requester = req.user;
    const createUser = new UsersModel({ ...body });
    const result = await createUser.save();
   
    res
      .status(201)
      .json({ 
        data: result, 
        success: true, 
        message: 'CREATED' 
      });
      
  } catch (error) {
    res
      .status(400)
      .json({ 
        success: false, 
        message: `Error ${error}` 
      });
  }
}

const updateUser = async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const requester = req.user;

    const updateUser = await UsersModel
      .findOneAndUpdate(
        { _id: id }, 
        { ...body }, 
        { new: true, useFindAndModify: false }
      );

    if (updateUser === null) {
      return res
              .status(200)
              .json({ 
                success: false, 
                message: 'No user exist' 
              });
    }
    
    res
      .status(200)
      .json({ 
        data: updateUser, 
        success: true, 
        message: 'UPDATED' 
      });
  
  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const requester = req.user;

    const user = await UsersModel
      .findOne({ _id: id })
      .select({ first_name: 1 });
    
      const deletedUser = await UsersModel
      .findOneAndDelete(
        { _id: id }
      );

    if (deletedUser === null) {
      return res
              .status(200)
              .json({ 
                success: false, 
                message: 'No user exist' 
              });
    }
    
    res
      .status(200)
      .json({ 
        data: deletedUser, 
        success: true, 
        message: 'DELETED' 
      });
  
  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}

module.exports = { 
  addUser, 
  updateUser, 
  deleteUser, 
}