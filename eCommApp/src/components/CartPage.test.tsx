import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndContext } from '../test/test-utils';
import CartPage from './CartPage';
import { Product } from '../types';

// Test data constants
const APPLE_PRICE = 1.0;
const ORANGE_PRICE = 1.2;
const INITIAL_APPLE_QUANTITY = 2;
const INITIAL_ORANGE_QUANTITY = 1;

const mockProducts: Product[] = [
  { id: '1', name: 'Apple', price: APPLE_PRICE, image: 'apple.png', description: '', reviews: [], inStock: true },
  { id: '2', name: 'Orange', price: ORANGE_PRICE, image: 'orange.png', description: '', reviews: [], inStock: true },
];

// Factory function to create fresh mock cart for each test
const createMockCart = () => [
  { ...mockProducts[0], quantity: INITIAL_APPLE_QUANTITY },
  { ...mockProducts[1], quantity: INITIAL_ORANGE_QUANTITY },
];

describe('CartPage', () => {
  it('should display a message when the cart is empty', () => {
    renderWithRouterAndContext(<CartPage />, { initialCart: [] });
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  it('should display items in the cart', () => {
    // Arrange
    const mockCart = createMockCart();
    
    // Act
    renderWithRouterAndContext(<CartPage />, { initialCart: mockCart });

    // Assert
    expect(screen.getByRole('heading', { name: 'Your Cart' })).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Orange')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(2);
  });

  it('should display the correct subtotal', () => {
    // Arrange
    const mockCart = createMockCart();
    const expectedSubtotal = (APPLE_PRICE * INITIAL_APPLE_QUANTITY) + (ORANGE_PRICE * INITIAL_ORANGE_QUANTITY);
    
    // Act
    renderWithRouterAndContext(<CartPage />, { initialCart: mockCart });
    
    // Assert
    expect(screen.getByText(/Subtotal:/)).toHaveTextContent(`Subtotal: $${expectedSubtotal.toFixed(2)}`);
  });

  it('should display correct total when no discount is active', () => {
    // Arrange
    const mockCart = createMockCart();
    const expectedTotal = (APPLE_PRICE * INITIAL_APPLE_QUANTITY) + (ORANGE_PRICE * INITIAL_ORANGE_QUANTITY);
    
    // Act
    renderWithRouterAndContext(<CartPage />, { initialCart: mockCart });
    
    // Assert
    expect(screen.getByText(/Total:/)).toHaveTextContent(`Total: $${expectedTotal.toFixed(2)}`);
  });

  it('should not display sale discount when it is 0', () => {
    // Arrange
    const mockCart = createMockCart();
    const subtotal = (APPLE_PRICE * INITIAL_APPLE_QUANTITY) + (ORANGE_PRICE * INITIAL_ORANGE_QUANTITY);
    
    // Act
    renderWithRouterAndContext(<CartPage />, { initialCart: mockCart });

    // Assert
    expect(screen.queryByText(/Sale/)).not.toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toHaveTextContent(`Total: $${subtotal.toFixed(2)}`);
  });

  it('should allow increasing an item quantity', () => {
    // Arrange
    const mockCart = createMockCart();
    const { cartContext } = renderWithRouterAndContext(<CartPage />, { initialCart: mockCart });
    const increaseButtons = screen.getAllByRole('button', { name: /Increase quantity/ });

    // Act
    fireEvent.click(increaseButtons[0]); // Increase Apple quantity

    // Assert
    expect(cartContext.updateQuantity).toHaveBeenCalledWith('1', INITIAL_APPLE_QUANTITY + 1);
  });

  it('should allow decreasing an item quantity', () => {
    // Arrange
    const mockCart = createMockCart();
    const { cartContext } = renderWithRouterAndContext(<CartPage />, { initialCart: mockCart });
    const decreaseButtons = screen.getAllByRole('button', { name: /Decrease quantity/ });

    // Act
    fireEvent.click(decreaseButtons[0]); // Decrease Apple quantity

    // Assert
    expect(cartContext.updateQuantity).toHaveBeenCalledWith('1', INITIAL_APPLE_QUANTITY - 1);
  });

  it('should allow removing an item from the cart', () => {
    // Arrange
    const mockCart = createMockCart();
    const { cartContext } = renderWithRouterAndContext(<CartPage />, { initialCart: mockCart });
    const removeButtons = screen.getAllByRole('button', { name: 'Remove' });

    // Act
    fireEvent.click(removeButtons[1]); // Remove Orange

    // Assert
    expect(cartContext.removeFromCart).toHaveBeenCalledWith('2');
  });

  it('should open the checkout modal when "Checkout" is clicked', async () => {
    // Arrange
    const mockCart = createMockCart();
    renderWithRouterAndContext(<CartPage />, { initialCart: mockCart });
    const checkoutButton = screen.getByRole('button', { name: /Checkout/ });

    // Act
    fireEvent.click(checkoutButton);

    // Assert
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('should clear the cart when checkout is complete', async () => {
    // Arrange
    const mockCart = createMockCart();
    const { cartContext } = renderWithRouterAndContext(<CartPage />, { initialCart: mockCart });
    const checkoutButton = screen.getByRole('button', { name: /Checkout/ });

    // Act
    fireEvent.click(checkoutButton);
    const continueButton = await screen.findByRole('button', { name: 'Continue shopping after successful checkout' });
    fireEvent.click(continueButton);

    // Assert
    expect(cartContext.clearCart).toHaveBeenCalledTimes(1);
  });

  it('should handle removing the last item from cart', () => {
    // Arrange
    const singleItemCart = [{ ...mockProducts[0], quantity: 1 }];
    const { cartContext } = renderWithRouterAndContext(<CartPage />, { initialCart: singleItemCart });
    const removeButton = screen.getByRole('button', { name: 'Remove' });
    
    // Act
    fireEvent.click(removeButton);
    
    // Assert
    expect(cartContext.removeFromCart).toHaveBeenCalledWith('1');
  });

  it('should handle decreasing quantity to zero', () => {
    // Arrange
    const singleItemCart = [{ ...mockProducts[0], quantity: 1 }];
    const { cartContext } = renderWithRouterAndContext(<CartPage />, { initialCart: singleItemCart });
    const decreaseButton = screen.getByRole('button', { name: /Decrease quantity/ });
    
    // Act
    fireEvent.click(decreaseButton);
    
    // Assert
    expect(cartContext.updateQuantity).toHaveBeenCalledWith('1', 0);
  });
});