
import './App.css';
import ProductList from './products/ProductList'
import ProductForm from './products/ProductForm'
import { Provider } from 'react-redux';
import store from './store';
import Cart from './cart/Cart'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductList />
        <ProductForm />
        <Cart />
      </div>
    </Provider>
  );
}

export default App