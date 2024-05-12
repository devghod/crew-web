const mongoose = require('mongoose');

const ConfigurationsSchema = new mongoose.Schema({
  settings: {
    type: Array
  },
  status: {
    type: Boolean
  },

  // necessary fields
  date_created: {
    type: Date,
    required: true,
    default: Date.now
  },
  date_updated: {
    type: Date,
    required: true,
    default: Date.now
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Users' 
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

const Configurations = mongoose.model('Configurations', ConfigurationsSchema);
module.exports = Configurations;