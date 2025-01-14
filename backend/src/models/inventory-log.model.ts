import mongoose from 'mongoose';

const inventoryLogSchema = new mongoose.Schema({
  inventoryLog_inventory_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Inventory',
  },
  inventoryLog_transaction_type: {
    type: String, // in/out
  },
  inventoryLog_quantity: {
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

const InventoryLog = mongoose.model('InventoryLogs', inventoryLogSchema);
export default InventoryLog;