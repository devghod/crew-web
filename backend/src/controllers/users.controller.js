const UsersModel = require('../models/users.model');
const LogsModel = require('../models/logs.model');

const getUsersTest = async (req, res, next) => {
  try {
    const users = await UsersModel
      .find({ 
        deleted: false, 
        status: "Active" 
      })
      .select({ 
        first_name: 1, 
        middle_name: 1, 
        last_name: 1, 
        email: 1,
        status: 1,
        username: 1,
        date_created: 1,
        image: 1,
        gender: 1
      });

    res
      .json({ 
        users: users, 
        total: users.length,
        success: true, 
        message: 'USERS' 
      });

  } catch (error) {
    return {
      success: false, 
      message: `Error ${error}` 
    }
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await UsersModel
      .find({ 
        deleted: false, 
        status: "Active" 
      })
      .select({ 
        first_name: 1, 
        middle_name: 1, 
        last_name: 1, 
        email: 1,
        status: 1,
        username: 1,
        date_created: 1,
        image: 1,
        gender: 1
      });

    res
      .status(200)
      .json({ 
        users: users, 
        total: users.length,
        success: true, 
        message: 'USERS' 
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

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

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
        image: 1,
        gender: 1
      });

    res
      .status(200)
      .json({ 
        data: user, 
        success: true, 
        message: 'USER' 
      });

  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}

const getUsersByFilter = async (req, res, next) => {
  try {
    let match = {};

    if (Object.keys(req?.body).length > 0) {
      if (req.body?.status === 'Deleted') {
        match = { 
          $match: {
            deleted: true,
          }
        }
      } else {
        match = { $match: req.body };
      }
    } else {
      match = { $match: { "status": "Active" } };
    }

    const users = await UsersModel.aggregate([
      match,
      {
        $project: {
          first_name: 1, 
          middle_name: 1, 
          last_name: 1, 
          email: 1,
          status: 1,
          username: 1,
          date_created: 1,
          image: 1,
          gender: 1
        }
      }
    ]);

    res
      .status(200)
      .json({ 
        users: users, 
        total: users.length,
        success: true, 
        message: 'USER filtered' 
      });

  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}

const getUsersStatistics = async (req, res, next) => {
  try {
    
    const users = await UsersModel
      .find()
      .select({ 
        status: 1,
      });

    const total_users = users.length;
    const total_users_active = users.filter(user => user.status == 'Active').length;
    const total_users_deactive = users.filter(user => user.status == 'Deactive').length;

    res
      .status(200)
      .json({ 
        total_users: total_users,
        total_users_active: total_users_active,
        total_users_deactive: total_users_deactive,
        success: true, 
        message: 'USERS statistics' 
      });

  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}

const addUser = async (req, res, next) => {
  try {
    const body = req.body;
    const requester = req.user;
    const createUser = new UsersModel({ ...body });
    const result = await createUser.save();

    await new LogsModel({
      description: `Create user ${result.first_name}`,
      created_for: result._id,
      created_by: requester._id,
    }).save();
    
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

    await new LogsModel({
      description: `Update user ${updateUser.first_name}`,
      created_for: id,
      created_by: requester._id,
    }).save();
    
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

const updateUserStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const requester = req.user;
    let statusChange = "";

    const temp = await UsersModel
      .findOne({ _id: id })
      .select({ status: 1 });

    if (!temp) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (temp.status === "Active") {
      statusChange = "Deactive";
    } else {
      statusChange = "Active";
    }

    const user = await UsersModel
      .findOneAndUpdate(
        { _id: id }, 
        { status: statusChange }, 
        { new: true, useFindAndModify: false }
      );

    await new LogsModel({
      description: `Update user ${user.first_name} status`,
      created_for: id,
      created_by: requester._id,
    }).save();
    
    res
      .json({ 
        data: user, 
        success: true, 
        message: 'DEACTIVATED' 
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

    await new LogsModel({
      description: `Delete user ${user.first_name}`,
      created_for: id,
      created_by: requester._id,
    }).save();
    
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
  getUsersTest,
  getUsers, 
  getUserById, 
  getUsersByFilter, 
  getUsersStatistics,
  addUser, 
  updateUser, 
  deleteUser, 
  updateUserStatus,
}