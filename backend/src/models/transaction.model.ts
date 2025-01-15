import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  transaction_inventory_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Inventory',
  },
  transaction_quantity: {
    type: Number,
  },
  transaction_type: {
    type: String,  // Purchase | Sell
  },
  transaction_details: {
    type: String,
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

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;