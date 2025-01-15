import ProductModel from "../models/product.model";

export const productName = async(product_id: string) => {
  if (!product_id) return;

  const name = await ProductModel
      .findById(product_id)
      .select('product_name');
  
  return name.product_name;
}