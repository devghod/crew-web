import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  product_brand: {
    type: String,
  },
  product_description: {
    type: String,
  },
  product_category: {
    type: String,
  },
  product_type: {
    type: String,
  },
  product_height: {
    type: Number,
  },
  product_width: {
    type: Number,
  },
  product_length: {
    type: Number,
  },
  product_weight: {
    type: Number,
  },
  product_color: {
    type: String,
  },
  product_image: {
    type: Array,
  },
  product_thumbnail: {
    type: String,
  },
  product_price: {
    type: Number,
  },

  // product_: {
  //   type: ,
  // },
  
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

const Product = mongoose.model('Product', productSchema);
export default Product;