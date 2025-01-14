import { Router } from 'express';
const router = Router();

const { 
  getProducts, 
  createProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/product.controller');

router.get('/get-products', getProducts);
router.post('/create-product', createProduct);
router.delete('/delete-product/:id', deleteProduct);
router.put('/update-product/:id', updateProduct);

module.exports = router;