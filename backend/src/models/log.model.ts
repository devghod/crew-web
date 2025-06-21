import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  id_in_table: {
    type: String,
    required: true,
  },
  action: {
    type: String, // CRUD
    required: true,
  },
  details: {
    type: String,
  },
  user_id_execute: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
  model: {
    type: String
  },

  // optional
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
});

const Log = mongoose.model('Log', logSchema);
export default Log;