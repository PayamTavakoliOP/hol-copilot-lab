import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import CartPage from './components/CartPage';
import MemeButton from './components/MemeButton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <ErrorBoundary>
            <CartProvider>
                <a href="#main-content" className="skip-link">
                    Skip to main content
                </a>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
                {!isHomePage && <MemeButton />}
            </CartProvider>
        </ErrorBoundary>
    );
}

export default App;