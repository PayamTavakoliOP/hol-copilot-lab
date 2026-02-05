import { useEffect, useRef, useState } from 'react';
import { Product, Review } from '../types';

interface ReviewModalProps {
    product: Product | null;
    onClose: () => void;
    onSubmit: (review: Review) => void;
}

const ReviewModal = ({ product, onClose, onSubmit }: ReviewModalProps) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (product) {
            // Focus close button when modal opens
            closeButtonRef.current?.focus();

            // Trap focus within modal
            const handleTab = (e: KeyboardEvent) => {
                if (e.key === 'Tab' && modalRef.current) {
                    const focusableElements = modalRef.current.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0] as HTMLElement;
                    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            };

            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };

            document.addEventListener('keydown', handleTab);
            document.addEventListener('keydown', handleEscape);

            return () => {
                document.removeEventListener('keydown', handleTab);
                document.removeEventListener('keydown', handleEscape);
            };
        }
    }, [product, onClose]);

    if (!product) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const author = (form.elements.namedItem('author') as HTMLInputElement).value;
        const comment = (form.elements.namedItem('comment') as HTMLTextAreaElement).value;
        
        if (author && comment && rating > 0) {
            onSubmit({ author, comment, rating, date: new Date().toISOString() });
            form.reset();
            setRating(0);
        }
    };

    return (
        <div 
            className="modal-backdrop" 
            onClick={onClose}
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
            role="presentation"
            tabIndex={-1}
        >
            <div 
                className="modal-content" 
                onClick={e => e.stopPropagation()}
                onKeyDown={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="review-modal-title"
                ref={modalRef}
            >
                <button 
                    onClick={onClose} 
                    className="close-button"
                    aria-label="Close review modal"
                    ref={closeButtonRef}
                >
                    ×
                </button>
                <h2 id="review-modal-title">Reviews for {product.name}</h2>
                <div className="reviews-list" role="region" aria-label="Product reviews">
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <div key={index} className="review">
                                <p><strong>{review.author}</strong> ({new Date(review.date).toLocaleDateString()}):</p>
                                <p>{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="review-form">
                    <h3>Leave a Review</h3>
                    <label htmlFor="review-author" className="visually-hidden">Your name</label>
                    <input 
                        type="text" 
                        id="review-author" 
                        name="author" 
                        placeholder="Your name" 
                        required 
                        aria-required="true"
                    />
                    <label htmlFor="review-comment" className="visually-hidden">Your review</label>
                    <textarea 
                        id="review-comment" 
                        name="comment" 
                        placeholder="Your review" 
                        required 
                        aria-required="true"
                    ></textarea>
                    <div className="rating-group" role="radiogroup" aria-labelledby="rating-label">
                        <span id="rating-label">Rating:</span>
                        {[5, 4, 3, 2, 1].map(star => (
                            <label key={star} className="star-label" title={`${star} stars`}>
                                <input 
                                    type="radio" 
                                    name="rating" 
                                    value={star} 
                                    className="visually-hidden" 
                                    onChange={() => setRating(star)}
                                    checked={rating === star}
                                    required
                                />
                                <span aria-hidden="true" style={{ color: star <= rating ? 'gold' : 'grey' }}>★</span>
                            </label>
                        ))}
                    </div>
                    <button type="submit" className="modal-button">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
