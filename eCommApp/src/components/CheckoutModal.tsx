import { useEffect, useRef } from 'react';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
    const continueButtonRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Focus the continue button when modal opens
            continueButtonRef.current?.focus();

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
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-backdrop" onClick={onClose} role="presentation">
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="checkout-modal-title"
                ref={modalRef}
            >
                <h2 id="checkout-modal-title">Thank you for your order!</h2>
                <p>Your items will be shipped shortly.</p>
                <div className="checkout-modal-actions">
                    <button
                        ref={continueButtonRef}
                        onClick={onClose}
                        className="modal-button primary"
                        aria-label="Continue shopping after successful checkout"
                    >
                        Continue Shopping
                    </button>
                    <button onClick={onClose} className="close-btn">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
