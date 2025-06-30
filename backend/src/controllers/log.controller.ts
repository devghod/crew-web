import { Request, Response } from 'express';
import LogModel from '../models/log.model';

const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await LogModel.find();

    res
      .status(200)
      .json({ 
        data: logs, 
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

const postLogsPaginate = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const page = body.page;
    const size = body.size;

    let setPage = page ?? 1;

    const total = (await LogModel.find()).length;
    const logs = await LogModel
      .find()
      .sort({ date_created: -1 })
      .skip((setPage - 1) * size)
      .limit(size)
      .populate(['user_id_execute'])
      .exec();
      
    res
      .status(200)
      .json({ 
        data: logs, 
        total: total,
        page: setPage,
        size: size,
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

export { 
  getLogs, 
  postLogsPaginate
};