import { Product } from './products/products.slice';

const validateProduct = (product: Product): Promise<Product> => new Promise((resolve, reject) => setTimeout(() => {
  if (product.title.length === 0) {
    reject('No title')
  } if (product.price <= 0) {
    reject('price is incorrect')
  } resolve(product)
}, 500))

export default validateProduct;