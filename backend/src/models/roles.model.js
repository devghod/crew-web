const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const rolesSchema = new mongoose.Schema({
  role_name: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: String
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

const Roles = mongoose.model('Roles', rolesSchema);
module.exports = Roles;