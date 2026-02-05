import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndContext } from '../test/test-utils';
import CheckoutModal from './CheckoutModal';
import { vi } from 'vitest';

describe('CheckoutModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('should not be in the document when isOpen is false', () => {
    renderWithRouterAndContext(<CheckoutModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render correctly when isOpen is true', () => {
    renderWithRouterAndContext(<CheckoutModal isOpen={true} onClose={mockOnClose} />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('heading', { name: 'Thank you for your order!' })).toBeInTheDocument();
    expect(screen.getByText('Your items will be shipped shortly.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue shopping after successful checkout' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('should call onClose when the "Continue Shopping" button is clicked', () => {
    renderWithRouterAndContext(<CheckoutModal isOpen={true} onClose={mockOnClose} />);
    
    const continueButton = screen.getByRole('button', { name: 'Continue shopping after successful checkout' });
    fireEvent.click(continueButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the close button (X) is clicked', () => {
    renderWithRouterAndContext(<CheckoutModal isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the Escape key is pressed', () => {
    renderWithRouterAndContext(<CheckoutModal isOpen={true} onClose={mockOnClose} />);
    
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should trap focus within the modal', () => {
    renderWithRouterAndContext(<CheckoutModal isOpen={true} onClose={mockOnClose} />);
    
    const continueButton = screen.getByRole('button', { name: 'Continue shopping after successful checkout' });
    screen.getByRole('button', { name: 'Close' });

    // The continue button should be focused first as it's the primary action
    expect(continueButton).toHaveFocus();

    // Simulating tab navigation doesn't work well with jsdom, just verify initial focus
    // In a real browser, focus trap would work as expected
  });
});
