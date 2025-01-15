import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  inventory_product_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
  },
  inventory_product_availability: {
    type: Number,
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

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;