import { bindActionCreators, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import validateProduct from "../fake.api";
import { RootState } from "../store";
import ProductList from "./ProductList";

export interface Product {
  title: string,
  price: number,
  id: string
}

export enum ValidationState{
  Fulfilled, 
  Pending,
  Rejected
}

interface ProductSliceState{
  products: Product[],
  validationState?: ValidationState,
  errorMessage?: string
}

export const addProductAsync = createAsyncThunk('products/addNewProduct', async (initialProduct: Product) => {
  const product = await validateProduct(initialProduct);
  return product;
})

const initialProducts: Product[] = [
  { title: 'Sims', price: 30, id: 'aa' },
  { title: "Hunt", price: 90, id: 'bb' },
  { title: 'Hell', price: 20, id: 'cc' },
]

const initialState: ProductSliceState = {
  products: initialProducts,
  validationState: undefined,
  errorMessage: undefined
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
    },
    removeProduct: (state, action: PayloadAction<string>) => ({
      ...state,
      products: state.products.filter(product => product.id !== action.payload)
    })
     
  },
    extraReducers: builder => {
      builder.addCase(addProductAsync.fulfilled, (state, action) => ({
      ...state,
      validationState: ValidationState.Fulfilled,
      errorMessage: undefined,
      products: [...state.products, action.payload]

      }))
      builder.addCase(addProductAsync.rejected, (state, action) => ({
          ...state,
          validationState: ValidationState.Rejected,
          errorMessage: action.error.message
      }))
      builder.addCase(addProductAsync.pending, (state, action) => ({
          ...state,
          validationState: ValidationState.Pending,
          errorMessage: undefined

      }))
    }
  }
)

export const {addProduct, removeProduct} = productSlice.actions;

export const getProductsSelector = (state: RootState) => state.products.products;

export const getErrorMessage = (state: RootState) => state.products.errorMessage

export default productSlice.reducer;

