import { Request, Response } from 'express';
const LogModel = require('../models/log.model');

const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await LogModel.find();

    res
      .status(200)
      .json({ 
        logs: logs, 
        total: logs.length,
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

const getLogsPaginate = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const skip = body.skip;
    const limit = body.limit;

    const total = (await LogModel.find()).length;
    const logs = await LogModel
      .find()
      .sort({ date_created: -1 })
      .limit(limit)
      .skip(skip)
      .populate(['created_by', 'created_for']);
      
    res
      .status(200)
      .json({ 
        logs: logs, 
        total: total,
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
}

module.exports = { 
  getLogs, 
  getLogsPaginate
};