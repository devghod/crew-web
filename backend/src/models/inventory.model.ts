import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  inventory_product_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Inventory',
  },
  inventory_product_available: {
    type: Number,
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

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;