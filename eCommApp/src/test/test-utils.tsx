import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartContext, CartContextType, CartItem } from '../context/CartContext';
import { vi } from 'vitest';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialCart?: CartItem[];
  initialDiscount?: number;
}

// This is our custom render function. It wraps the UI in a router
// and a CartProvider, making it easy to test components that use them.
export const renderWithRouterAndContext = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  // Create mock functions for the cart context
  const mockAddToCart = vi.fn();
  const mockRemoveFromCart = vi.fn();
  const mockUpdateQuantity = vi.fn();
  const mockClearCart = vi.fn();
  const mockSetSaleDiscount = vi.fn();

  const { 
    initialCart = [], 
    initialDiscount = 0, 
    ...renderOptions 
  } = options;

  // The value that will be provided to the context consumer
  const providerValue: CartContextType = {
    cart: initialCart,
    saleDiscount: initialDiscount,
    addToCart: mockAddToCart,
    removeFromCart: mockRemoveFromCart,
    updateQuantity: mockUpdateQuantity,
    clearCart: mockClearCart,
    setSaleDiscount: mockSetSaleDiscount,
  };

  const renderResult = render(
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <CartContext.Provider value={providerValue}>
        {ui}
      </CartContext.Provider>
    </BrowserRouter>,
    renderOptions
  );

  return {
    ...renderResult,
    // Return the mock functions so they can be asserted against in tests
    cartContext: {
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
      setSaleDiscount: mockSetSaleDiscount,
    },
  };
};

// Re-export everything from React Testing Library
export * from '@testing-library/react';

