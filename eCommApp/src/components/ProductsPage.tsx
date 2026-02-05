import { useState, useEffect, useContext } from 'react';
import { Product, Review } from '../types';
import Header from './Header';
import Footer from './Footer';
import ReviewModal from './ReviewModal';
import { CartContext } from '../context/CartContext';

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('CartContext must be used within a CartProvider');
    }

    const { addToCart } = cartContext;

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productFiles = [
                    'apple.json',
                    'grapes.json',
                    'orange.json',
                    'pear.json'
                ];
                const productPromises = productFiles.map(async (file) => {
                    const response = await fetch(`products/${file}`);
                    if (!response.ok) throw new Error(`Failed to load ${file}`);
                    return await response.json();
                });
                const loadedProducts = await Promise.all(productPromises);
                setProducts(loadedProducts.filter(p => p)); // Filter out any nulls from failed fetches
            } catch (error) {
                console.error('Error loading products:', error);
                setProducts([]); // Clear products on error
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const handleReviewSubmit = (review: Review) => {
        if (selectedProduct) {
            const updatedProduct = {
                ...selectedProduct,
                reviews: [review, ...selectedProduct.reviews],
            };
            const updatedProducts = products.map(p =>
                p.id === updatedProduct.id ? updatedProduct : p
            );
            setProducts(updatedProducts);
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
                    {products.length === 0 && !loading ? (
                        <p>Error loading products</p>
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
