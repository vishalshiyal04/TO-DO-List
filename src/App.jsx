import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductPage';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}

export default App;