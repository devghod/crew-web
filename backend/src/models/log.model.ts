import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  collection: {
    type: String,
  },
  id_in_table: {
    type: String,
  },
  action: {
    type: String, // CRUD
  },
  description: {
    type: String,
  },
  user_id_execute: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
  new_data: {
    type: Object,
  },
  old_data: {
    type: Object,
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
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;