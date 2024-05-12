const LogsModel = require('../models/logs.model');

const getLogs = async (req, res, next) => {
  try {
    const logs = await LogsModel.find();

    res
      .status(200)
      .json({ 
        logs: logs, 
        total: logs.length,
        success: true, 
        message: 'LOGS' 
      });

  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}

const getLogsPaginate = async (req, res, next) => {
  try {
    const body = req.body;
    const skip = body.skip;
    const limit = body.limit;

    const total = (await LogsModel.find()).length;
    const logs = await LogsModel
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
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}

module.exports = { 
  getLogs, 
  getLogsPaginate
}