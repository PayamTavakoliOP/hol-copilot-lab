import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { cart } = useCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="app-header">
            <h1>The Daily Harvest</h1>
            <nav aria-label="Main navigation">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/cart">
                    Cart {totalItems > 0 && `(${totalItems})`}
                </Link>
                <Link to="/login" className="admin-login-link">
                    Admin Login
                </Link>
            </nav>
        </header>
    );
};

export default Header;
