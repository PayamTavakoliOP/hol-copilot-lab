import { useEffect, useRef } from 'react';

interface CheckoutModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const CheckoutModal = ({ onConfirm, onCancel }: CheckoutModalProps) => {
    const confirmButtonRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Focus the confirm button when modal opens
        confirmButtonRef.current?.focus();

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
                onCancel();
            }
        };

        document.addEventListener('keydown', handleTab);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleTab);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onCancel]);

    return (
        <div className="modal-backdrop" onClick={onCancel} role="presentation">
            <div 
                className="modal-content" 
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="checkout-modal-title"
                aria-describedby="checkout-modal-description"
                ref={modalRef}
            >
                <h2 id="checkout-modal-title">Are you sure?</h2>
                <p id="checkout-modal-description">Do you want to proceed with the checkout?</p>
                <div className="checkout-modal-actions">
                    <button 
                        onClick={onConfirm}
                        ref={confirmButtonRef}
                    >
                        Continue Checkout
                    </button>
                    <button onClick={onCancel} className="cancel-btn">
                        Return to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
