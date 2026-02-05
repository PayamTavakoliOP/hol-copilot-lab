import { useEffect, useRef } from 'react';
import { Product, Review } from '../types';

interface ReviewModalProps {
    product: Product | null;
    onClose: () => void;
    onSubmit: (review: Review) => void;
}

const ReviewModal = ({ product, onClose, onSubmit }: ReviewModalProps) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

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
        const author = (e.currentTarget.elements.namedItem('author') as HTMLInputElement).value;
        const comment = (e.currentTarget.elements.namedItem('comment') as HTMLTextAreaElement).value;
        onSubmit({ author, comment, date: new Date().toISOString() });
        e.currentTarget.reset();
    };

    return (
        <div 
            className="modal-backdrop" 
            onClick={onClose}
            role="presentation"
        >
            <div 
                className="modal-content" 
                onClick={e => e.stopPropagation()}
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
                    {product.reviews.length > 0 ? (
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
                    />
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
