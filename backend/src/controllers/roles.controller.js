const RolesModel = require('../models/roles.model');
const LogsModel = require('../models/logs.model');

const getRoles = async (req, res, next) => {
  try {
    const roles = await RolesModel
      .find({ deleted: false, status: "Active" });

    res
      .status(200)
      .json({ 
        roles: roles, 
        total: roles.length,
        success: true, 
        message: 'ROLES' 
      });

  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}

const getRoleById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const role = await RolesModel
      .findOne({ _id: id });

    res
      .status(200)
      .json({ 
        data: role, 
        success: true, 
        message: 'ROLE' 
      });

  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}

const getRolesByFilter = async (req, res, next) => {
  try {
    let match = {};
    
    if (Object.keys(req?.body).length > 0) {
      match = { $match: req.body };
    } else {
      match = { $match: { "status": "Active" } };
    }

    const roles = await RolesModel.aggregate([
      match,
      {}
    ]);

    res
      .status(200)
      .json({ 
        roles: roles, 
        total: roles.length,
        success: true, 
        message: 'ROLES filtered' 
      });

  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}

const addRole = async (req, res, next) => {
  try {
    const body = req.body;
    const requester = req.user;
    const createRole = new RolesModel({ ...body });
    const result = await createRole.save();

    await new LogsModel({
      description: "New Role",
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

const updateRole = async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const requester = req.user;

    const updateRole = await RolesModel
      .findOneAndUpdate(
        { _id: id }, 
        { ...body }, 
        { new: true, useFindAndModify: false }
      );

    if (updateRole === null) {
      return res
              .status(200)
              .json({ 
                success: false, 
                message: 'No role exist' 
              });
    }

    await new LogsModel({
      description: "Update Role",
      created_for: id,
      created_by: requester._id,
    }).save();
    
    res
      .status(200)
      .json({ 
        data: updateRole, 
        success: true, 
        message: 'UPDATED' 
      });
  
  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}

const updateRoleStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const requester = req.user;
    let statusChange = "";

    const status = RolesModel
                    .findOne({ _id: id })
                    .select({ status: 1 });

    if (!status) {
      return res.json({ success: false, message: 'Role not found' });
    }

    if (status === "Active") {
      statusChange = "Deactivate";
    } else {
      statusChange = "Active";
    }

    const role = await RolesModel
      .findOneAndUpdate(
        { _id: id }, 
        { status: statusChange }, 
        { new: true, useFindAndModify: false }
      );

    await new LogsModel({
      description: "Update Role Status",
      created_for: id,
      created_by: requester._id,
    }).save();
    
    res
      .json({ 
        data: role, 
        success: true, 
        message: 'DEACTIVATED' 
      });
  
  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}

const deleteRole = async (req, res, next) => {
  try {
    const id = req.params.id;
    const requester = req.user;

    const deleteRole = await RolesModel
      .findOneAndDelete(
        { _id: id }
      );

    if (deleteRole === null) {
      return res
        .status(200)
        .json({ 
          success: false, 
          message: 'No role exist' 
        });
    }

    await new LogsModel({
      description: "Delete Role",
      created_for: id,
      created_by: requester._id,
    }).save();
    
    res
      .status(200)
      .json({ 
        data: deleteRole, 
        success: true, 
        message: 'DELETED' 
      });
  
  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}

module.exports = { 
  getRoles, 
  getRoleById, 
  getRolesByFilter, 
  addRole, 
  updateRole, 
  deleteRole, 
  updateRoleStatus 
}