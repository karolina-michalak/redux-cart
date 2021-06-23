import { bindActionCreators, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Product {
  title: string,
  price: number,
  id: string
}

const initialState: Product[] = [
  { title: 'Sims', price: 30, id: 'aa' },
  { title: "Hunt", price: 90, id: 'bb' },
  { title: 'Hell', price: 20, id: 'cc' },
]

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload)
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      return state.filter(product => product.id !== action.payload)
    }
  }
})

export const {addProduct, removeProduct} = productSlice.actions;

export const getProductsSelector = (state: RootState) => state.products;

export default productSlice.reducer;
