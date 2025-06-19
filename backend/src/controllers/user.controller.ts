import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { Logging } from '../helpers/Log.helper';
const bcrypt = require('bcrypt');

export const getUser = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    // const user = await UserModel.findById({ 
    //   _id: id,
    //   // status: "active" ,
    //   deleted_at: { $eq: null },
    // });

    const user = await UserModel.findById(id);

    if (!user) {
      res
        .status(404)
        .json({ 
          message: "User not found",
          success: false
        });
    }

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
        message: `Error: ${error}` 
      });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {

    const users = await UserModel.find({ 
      deleted_at: { $eq: null },
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
        message: `Error: ${error}` 
      });
  }
};

export const getUsersStatistics = async (req: Request, res: Response) => {
  
  try {
    const users = await UserModel.aggregate([
      {
        $group: {
          _id: null,
          totalCount: { $sum: { $cond: [ {}, 1, 0] } },
          activeCount: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
          inactiveCount: { $sum: { $cond: [{ $eq: ['$status', 'inactive'] }, 1, 0] } },
          holdCount: { $sum: { $cond: [{ $eq: ['$status', 'onhold'] }, 1, 0] } },
          softDeleteCount: { $sum: { $cond: [{ $ne: ['$deleted_at', null ] }, 1, 0] } },
        }
      }
    ]);  
    
    res
        .status(200)
        .json({ 
          success: true,
          message: "Users",
          data: users[0],
        });

  } catch (error) {
    res
      .status(500)
      .json({
        success: false, 
        message: `Error: ${error}` 
      });
  }

};

export const postUsersList = async (req: Request, res: Response) => {
  try {
    const { size, page, filters } = req.body;
    const { fields, search: searchWord } = filters;
    const match: any = {};

    let setPage = page ?? 1;

    const filtersFields = fields ? fields.map((filter: any) => { 
      return { 
        [filter]: { $regex: searchWord, $options: 'i' }
      }
    }) : {};

    match.$and = [{ deleted_at: null }];

    // Return to first page if search exist
    if (searchWord) setPage = 1;
    if (searchWord) match.$and.push({ $or: filtersFields });

    const users = await UserModel.aggregate([
        { $match: match },
        { $sort: { date_created: -1 } }
      ])
      .skip((setPage - 1) * size)
      .limit(size)
      .exec();

    const total_users = await UserModel.countDocuments({ 
        deleted_at: { $eq: null },
      });

    res
      .status(200)
      .json({ 
        success: true,
        message: "Users List Paginated",
        data: users,
        size: size,
        page: setPage,
        total: total_users,
      });
  
  } catch (error) {
    res
      .status(500)
      .json({
        success: false, 
        message: `Error: ${error}` 
      });
  }
};

export const getUsersSelections = async (req: Request, res: Response) => {
  try {

    const { selections } = req.body;

    const users = await UserModel.find({ 
      // status: "active" ,
      deleted_at: { $eq: null },
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
        message: `Error: ${error}` 
      });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { 
      username, 
      password: tempPassword, 
      email 
    } = body;
    let password = tempPassword;

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
        .json({ message: 'Username or email already exists' });
    }

    if (password === '') {
      password = 'Admin@123'; // default password
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel(body);
    user.password = hashedPassword;
    const result = await user.save();

    if (result) Logging(result, req, 'create');
    
    res
      .status(201)
      .json({ 
        data: result, 
        success: true, 
        message: 'CREATED' 
      });
  } catch (error) {
    res
      .status(500)
      .json({ 
        success: false, 
        message: `Error: ${error}` 
      });
  };
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const updated = await UserModel
      .findOneAndUpdate(
        { _id: id }, 
        { ...body }, 
        { new: true, useFindAndModify: false }
      );
    
    if (!updated) {
      res
        .status(404)
        .json({ 
          success: false, 
          message: 'No data' 
        });
    };

    if (updated) Logging(updated, req, 'update');
    
    res
      .status(200)
      .json({ 
        data: updated, 
        success: true, 
        message: 'UPDATED' 
      });
  } catch (error) {
    res
      .status(500)
      .json({ 
        success: false, 
        message: `Error: ${error}` 
      });
  };
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const { password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updated = await UserModel
      .findOneAndUpdate(
        { _id: id }, 
        { password: hashedPassword }, 
        { new: true, useFindAndModify: false }
      );
    
    if (!updated) {
      res
        .status(404)
        .json({ 
          success: false, 
          message: 'No data' 
        });
    };

    if (updated) Logging(updated, req, 'update');
    
    res
      .status(200)
      .json({ 
        data: updated, 
        success: true, 
        message: 'UPDATED' 
      });
  } catch (error) {
    res
      .status(500)
      .json({ 
        success: false, 
        message: `Error: ${error}` 
      });
  };
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await UserModel
      .findOneAndDelete({ _id: id });
    
    if (!deleted) {
      res
        .status(404)
        .json({ 
          success: false, 
          message: 'No data' 
        });
    };

    if (deleted) Logging(deleted, req, 'delete');
    
    res
      .status(200)
      .json({ 
        data: deleted, 
        success: true, 
        message: 'DELETED' 
      });
  } catch (error) {
    res
      .status(500)
      .json({ 
        success: false, 
        message: `Error: ${error}` 
      });
  }
}; 

export const softDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentDate = new Date().toISOString();

    const updated = await UserModel
      .findOneAndUpdate(
        { _id: id }, 
        { deleted_at: currentDate }, 
        { new: true, useFindAndModify: false }
      );
    
    if (!updated) {
      res
        .status(404)
        .json({ 
          success: false, 
          message: 'No data' 
        });
    };
    
    res
      .status(200)
      .json({ 
        data: updated, 
        success: true, 
        message: 'UPDATED' 
      });
  } catch (error) {
    res
      .status(500)
      .json({ 
        success: false, 
        message: `Error: ${error}` 
      });
  }
}; 