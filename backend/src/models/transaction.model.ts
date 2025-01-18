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

  date_created: {
    type: Date,
    required: true,
    default: Date.now
  },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;