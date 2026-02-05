import { useContext, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { CartContext } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

const CartPage = () => {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('CartContext must be used within a CartProvider');
    }

    const { cart, clearCart, updateQuantity, removeFromCart, saleDiscount } = cartContext;

    const handleCheckout = () => {
        setIsCheckingOut(true);
    };

    const handleCloseCheckout = () => {
        clearCart();
        setIsCheckingOut(false);
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = subtotal * saleDiscount;
    const total = subtotal - discountAmount;

    return (
        <div className="app">
            <Header />
            <main id="main-content" className="main-content">
                <div className="cart-container">
                    <h2>Your Cart</h2>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <div className="cart-items-grid" role="list" aria-label="Cart items">
                                {cart.map(item => (
                                    <article key={item.id} className="cart-item-card" role="listitem">
                                        <img
                                            src={`products/productImages/${item.image}`}
                                            alt={`${item.name} in cart`}
                                            className="cart-item-image"
                                        />
                                        <div className="cart-item-info">
                                            <h3>{item.name}</h3>
                                            <p>Price: ${item.price.toFixed(2)}</p>
                                            <div className="quantity-controls">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease quantity of ${item.name}`}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase quantity of ${item.name}`}>+</button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <div className="cart-summary">
                                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                                {saleDiscount > 0 && (
                                    <p className="sale-discount">Sale ({saleDiscount * 100}% off): -${discountAmount.toFixed(2)}</p>
                                )}
                                <p className="total-price">Total: ${total.toFixed(2)}</p>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="checkout-btn"
                                aria-label={`Checkout ${cart.length} item${cart.length > 1 ? 's' : ''}`}
                            >
                                Checkout
                            </button>
                        </>
                    )}
                </div>
            </main>
            <Footer />
            <CheckoutModal
                isOpen={isCheckingOut}
                onClose={handleCloseCheckout}
            />
        </div>
    );
};

export default CartPage;
