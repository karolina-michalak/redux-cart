import React from 'react'
import { useSelector } from 'react-redux';
import { getProductsSelector, removeProduct, Product } from './products.slice';
import { useAppDispatch } from '../store.hooks';
import {addToCart} from '../cart/cart.slice'

const ProductList: React.FC = () => {

  const products = useSelector(getProductsSelector);
  const dispatch = useAppDispatch()

  const remove = (id: string) => {
    dispatch(removeProduct(id))
  }

  const addToCartHandler = (product: Product) => dispatch(addToCart(product))

  return (<div>
    <h2>Games list</h2>
    {products.map(product => <div key={product.id}><span>{`${product.title} : ${product.price}`}</span>

    <button onClick={() => addToCartHandler(product)}>add to cart</button>
    <button onClick={() => remove(product.id)}>x</button>
    
    </div>
    )}
  </div>
  );
}

export default ProductList