import { Router } from 'express';
const router = Router();

const { 
  getProducts, 
  createProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/product.controller');

router.get('/get-products', getProducts);
router.post('/post-product', createProduct);
router.delete('/delete-product/:id', deleteProduct);
router.put('/put-product/:id', updateProduct);

module.exports = router;