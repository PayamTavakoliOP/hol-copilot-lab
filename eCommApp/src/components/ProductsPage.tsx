import { useState, useContext } from 'react';
import { Product, Review } from '../types';
import Header from './Header';
import Footer from './Footer';
import ReviewModal from './ReviewModal';
import { CartContext } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';

const ProductsPage = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { products, loading, error } = useProducts();
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('CartContext must be used within a CartProvider');
    }

    const { addToCart } = cartContext;

    const handleReviewSubmit = (review: Review) => {
        if (selectedProduct) {
            const updatedProduct = {
                ...selectedProduct,
                reviews: [review, ...selectedProduct.reviews],
            };
            setSelectedProduct(updatedProduct);
        }
    };

    if (loading) {
        return (
            <div className="app">
                <Header />
                <main id="main-content" className="main-content" aria-live="polite" aria-busy="true">
                    <div className="loading" role="status">Loading products...</div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="app">
            <Header />
            <main id="main-content" className="main-content">
                <div className="products-container">
                    <h2>Our Products</h2>
                    {error ? (
                        <div className="error-message" role="alert">
                            <p>{error}</p>
                            <p>Please try refreshing the page.</p>
                        </div>
                    ) : products.length === 0 && !loading ? (
                        <p>No products available</p>
                    ) : (
                        <div className="products-grid">
                            {products.map((product) => (
                                <article key={product.id || product.name} className="product-card">
                                    {product.image && (
                                        <button
                                            className="product-image-button"
                                            onClick={() => setSelectedProduct(product)}
                                            aria-label={`View reviews for ${product.name}`}
                                        >
                                            <img
                                                src={`products/productImages/${product.image}`}
                                                alt={`${product.name} - ${product.description || 'Fresh produce'}`}
                                                className="product-image"
                                            />
                                        </button>
                                    )}
                                    <div className="product-info">
                                        <h3 className="product-name">{product.name}</h3>
                                        <p className="product-price" aria-label={`Price: $${product.price.toFixed(2)}`}>
                                            ${product.price.toFixed(2)}
                                        </p>
                                        {product.description && (
                                            <p className="product-description">{product.description}</p>
                                        )}
                                        <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                                            Add to Cart
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
            {selectedProduct && (
                <ReviewModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onSubmit={handleReviewSubmit}
                />
            )}
        </div>
    );
};

export default ProductsPage;
