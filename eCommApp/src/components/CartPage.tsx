import { useContext, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { CartContext, CartItem } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

const CartPage = () => {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderProcessed, setOrderProcessed] = useState(false);
    const [processedItems, setProcessedItems] = useState<CartItem[]>([]);
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('CartContext must be used within a CartProvider');
    }

    const { cartItems, clearCart } = cartContext;

    const handleCheckout = () => {
        setIsCheckingOut(true);
    };

    const handleConfirmCheckout = () => {
        setProcessedItems([...cartItems]);
        clearCart();
        setIsCheckingOut(false);
        setOrderProcessed(true);
    };

    if (orderProcessed) {
        return (
            <div className="app">
                <Header />
                <main id="main-content" className="main-content">
                    <div className="order-processed-container" role="region" aria-labelledby="order-confirmation-heading">
                        <h2 id="order-confirmation-heading">Your order has been processed!</h2>
                        <div className="cart-items-grid">
                            {processedItems.map(item => (
                                <article key={item.id} className="cart-item-card">
                                    <img 
                                        src={`products/productImages/${item.image}`} 
                                        alt={`${item.name} - ordered item`}
                                        className="cart-item-image" 
                                    />
                                    <div className="cart-item-info">
                                        <h3>{item.name}</h3>
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="app">
            <Header />
            <main id="main-content" className="main-content">
                <div className="cart-container">
                    <h2>Your Cart</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <div className="cart-items-grid" role="list" aria-label="Cart items">
                                {cartItems.map(item => (
                                    <article key={item.id} className="cart-item-card" role="listitem">
                                        <img 
                                            src={`products/productImages/${item.image}`} 
                                            alt={`${item.name} in cart`}
                                            className="cart-item-image" 
                                        />
                                        <div className="cart-item-info">
                                            <h3>{item.name}</h3>
                                            <p>Price: ${item.price.toFixed(2)}</p>
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <button 
                                onClick={handleCheckout} 
                                className="checkout-btn"
                                aria-label={`Checkout ${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`}
                            >
                                Checkout
                            </button>
                        </>
                    )}
                </div>
            </main>
            <Footer />
            {isCheckingOut && (
                <CheckoutModal
                    onConfirm={handleConfirmCheckout}
                    onCancel={() => setIsCheckingOut(false)}
                />
            )}
        </div>
    );
};

export default CartPage;
