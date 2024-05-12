const ConfigurationsModel = require('../models/configurations.model');
const LogsModel = require('../models/logs.model');

const getConfigurations = async (req, res, next) => {
  try {
    const configurations = await ConfigurationsModel
      .find({ deleted: false, status: "Active" });

    res
      .status(200)
      .json({ 
        configurations: configurations, 
        total: configurations.length,
        success: true, 
        message: 'CONFIGURATIONS' 
      });

  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}


const addConfiguration = async (req, res, next) => {
  try {
    const body = req.body;
    const requester = req.configuration;
    const createConfiguration = new ConfigurationsModel({ ...body });
    const result = await createConfiguration.save();

    await new LogsModel({
      description: `Create configuration ${result.first_name}`,
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

const updateConfiguration = async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const requester = req.configuration;

    const updateConfiguration = await ConfigurationsModel
      .findOneAndUpdate(
        { _id: id }, 
        { ...body }, 
        { new: true, useFindAndModify: false }
      );

    if (updateConfiguration === null) {
      return res
              .status(200)
              .json({ 
                success: false, 
                message: 'No configuration exist' 
              });
    }

    await new LogsModel({
      description: `Update configuration ${updateConfiguration.first_name}`,
      created_for: id,
      created_by: requester._id,
    }).save();
    
    res
      .status(200)
      .json({ 
        data: updateConfiguration, 
        success: true, 
        message: 'UPDATED' 
      });
  
  } catch (error) {
    res.status(400).json({ success: false, message: `Error ${error}` });
  }
}


module.exports = { 
  getConfigurations,
  addConfiguration, 
  updateConfiguration, 
}