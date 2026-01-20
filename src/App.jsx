import { Routes, Route } from 'react-router-dom';
import Header from './layouts/header';
import Footer from './layouts/footer';
import MainPage from './pages/main-page';
import CategoriesPage from './pages/categories-page';
import CategoryPage from './pages/category-page';
import ProductsPage from './pages/products-page';
import ProductPage from './pages/product-page';
import SalePage from './pages/sale-page';
import CartPage from './pages/cart-page';
import NotFoundPage from './pages/not-found-page';
import './App.css';

function App() {
    return (
        <div className="app">
            <Header />
            <main style={{ minHeight: '70vh', padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/categories/:id" element={<CategoryPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductPage />} />
                    <Route path="/sale" element={<SalePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;