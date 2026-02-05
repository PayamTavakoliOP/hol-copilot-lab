import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { CartContext, CartItem } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

const AdminPage = () => {
    const [inputValue, setInputValue] = useState<string>('0');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [statusMessage, setStatusMessage] = useState<string>('No sale active.');

    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('AdminPage must be used within a CartProvider');
    }

    const { setSaleDiscount } = cartContext;

    const handleSubmit = () => {
        const sanitizedValue = Number(inputValue);
        if (isNaN(sanitizedValue) || sanitizedValue < 0 || sanitizedValue > 100) {
            setErrorMessage('Sale percentage must be between 0 and 100.');
        } else {
            const newSaleDiscount = sanitizedValue / 100;
            setSaleDiscount(newSaleDiscount);
            setErrorMessage('');
            setStatusMessage(`All products are ${sanitizedValue}% off!`);
        }
    };

    const handleEndSale = () => {
        setSaleDiscount(0);
        setInputValue('0');
        setErrorMessage('');
        setStatusMessage('No sale active.');
    };

    return (
        <div className="app">
            <Header />
            <main id="main-content" className="main-content">
                <div className="admin-portal">
                    <h2>Admin Portal</h2>
                    <p>Welcome to the admin portal.</p>
                    <div className="admin-form">
                        {errorMessage && (
                            <div role="alert" aria-live="assertive" className="error-message">
                                {errorMessage}
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="salePercent">Set Sale Percent (% off for all items):</label>
                            <input
                                id="salePercent"
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                aria-describedby="sale-percent-description"
                                aria-invalid={!!errorMessage}
                            />
                        </div>
                        <p id="sale-percent-description" className="form-hint">
                            Enter a number between 0 and 100
                        </p>
                        <div className="button-group">
                            <button
                                onClick={handleSubmit}
                                aria-label="Apply sale percentage"
                            >
                                Set Sale
                            </button>
                            <button
                                onClick={handleEndSale}
                                aria-label="Clear sale and set to 0%"
                            >
                                End Sale
                            </button>
                        </div>
                    </div>
                    <div role="status" aria-live="polite" className="sale-status">
                        {statusMessage}
                    </div>
                    <Link to="/" className="back-link">
                        <button>Back to Storefront</button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminPage;
