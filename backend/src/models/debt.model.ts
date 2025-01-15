import mongoose from 'mongoose';

const debtSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  amount_remaining: {
    type: Number
  },
  interest_rate: {
    type: Number
  },
  installment: {
    type: String,
  },
  method: {
    type: String,
  },
  status: {
    type: String,
  },
  due_date: {
    type: Date,
    required: true,
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
  deleted_at: {
    type: Date,
    default: null
  }
});

const Debt = mongoose.model('Debt', debtSchema);
module.exports = Debt;