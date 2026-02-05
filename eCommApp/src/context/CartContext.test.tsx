import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartProvider, useCart, CartItem } from './CartContext';
import { Product } from '../types';

// Mock product data
const mockProduct1: Product = {
  id: 1,
  name: 'Apple',
  price: 1.0,
  description: 'Fresh apple',
  image: '/apple.jpg',
  nutritionFacts: { calories: 95, protein: 0, carbs: 25, fat: 0 }
};

const mockProduct2: Product = {
  id: 2,
  name: 'Orange',
  price: 1.2,
  description: 'Fresh orange',
  image: '/orange.jpg',
  nutritionFacts: { calories: 62, protein: 1, carbs: 15, fat: 0 }
};

const mockCartItem: CartItem = {
  ...mockProduct1,
  quantity: 2
};

describe('CartContext', () => {
  describe('useCart hook', () => {
    it('should throw an error when used outside of CartProvider', () => {
      // Arrange & Act & Assert
      expect(() => {
        renderHook(() => useCart());
      }).toThrow('useCart must be used within a CartProvider');
    });

    it('should provide cart context when used within CartProvider', () => {
      // Arrange & Act
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider
      });

      // Assert
      expect(result.current).toBeDefined();
      expect(result.current.cart).toEqual([]);
      expect(result.current.saleDiscount).toBe(0);
    });
  });

  describe('CartProvider', () => {
    it('should initialize with empty cart by default', () => {
      // Arrange & Act
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider
      });

      // Assert
      expect(result.current.cart).toEqual([]);
      expect(result.current.saleDiscount).toBe(0);
    });

    it('should initialize with provided initial cart', () => {
      // Arrange
      const initialCart = [mockCartItem];
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider initialCart={initialCart}>{children}</CartProvider>
      );

      // Act
      const { result } = renderHook(() => useCart(), { wrapper });

      // Assert
      expect(result.current.cart).toEqual(initialCart);
    });

    it('should initialize with provided initial discount', () => {
      // Arrange
      const initialDiscount = 0.15;
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider initialDiscount={initialDiscount}>{children}</CartProvider>
      );

      // Act
      const { result } = renderHook(() => useCart(), { wrapper });

      // Assert
      expect(result.current.saleDiscount).toBe(0.15);
    });
  });

  describe('addToCart', () => {
    it('should add a new product to empty cart with quantity 1', () => {
      // Arrange
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider
      });

      // Act
      act(() => {
        result.current.addToCart(mockProduct1);
      });

      // Assert
      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0]).toEqual({ ...mockProduct1, quantity: 1 });
    });

    it('should increment quantity when adding existing product', () => {
      // Arrange
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider
      });

      // Act
      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct1);
      });

      // Assert
      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0].quantity).toBe(2);
    });

    it('should add multiple different products to cart', () => {
      // Arrange
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider
      });

      // Act
      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      // Assert
      expect(result.current.cart).toHaveLength(2);
      expect(result.current.cart[0].id).toBe(mockProduct1.id);
      expect(result.current.cart[1].id).toBe(mockProduct2.id);
    });

    it('should preserve other products when incrementing one', () => {
      // Arrange
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider
      });

      // Act
      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
        result.current.addToCart(mockProduct1);
      });

      // Assert
      expect(result.current.cart).toHaveLength(2);
      expect(result.current.cart[0].quantity).toBe(2);
      expect(result.current.cart[1].quantity).toBe(1);
    });
  });

  describe('removeFromCart', () => {
    it('should remove a product from cart by id', () => {
      // Arrange
      const initialCart = [mockCartItem];
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider initialCart={initialCart}>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCart(), { wrapper });

      // Act
      act(() => {
        result.current.removeFromCart(mockProduct1.id);
      });

      // Assert
      expect(result.current.cart).toHaveLength(0);
    });

    it('should only remove the specified product', () => {
      // Arrange
      const initialCart = [
        { ...mockProduct1, quantity: 2 },
        { ...mockProduct2, quantity: 1 }
      ];
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider initialCart={initialCart}>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCart(), { wrapper });

      // Act
      act(() => {
        result.current.removeFromCart(mockProduct1.id);
      });

      // Assert
      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0].id).toBe(mockProduct2.id);
    });

    it('should handle removing non-existent product gracefully', () => {
      // Arrange
      const initialCart = [mockCartItem];
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider initialCart={initialCart}>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCart(), { wrapper });

      // Act
      act(() => {
        result.current.removeFromCart(999);
      });

      // Assert
      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0].id).toBe(mockProduct1.id);
    });
  });

  describe('updateQuantity', () => {
    it('should update quantity of an existing product', () => {
      // Arrange
      const initialCart = [mockCartItem];
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider initialCart={initialCart}>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCart(), { wrapper });

      // Act
      act(() => {
        result.current.updateQuantity(mockProduct1.id, 5);
      });

      // Assert
      expect(result.current.cart[0].quantity).toBe(5);
    });

    it('should remove product when quantity is set to 0', () => {
      // Arrange
      const initialCart = [mockCartItem];
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider initialCart={initialCart}>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCart(), { wrapper });

      // Act
      act(() => {
        result.current.updateQuantity(mockProduct1.id, 0);
      });

      // Assert
      expect(result.current.cart).toHaveLength(0);
    });

    it('should remove product when quantity is negative', () => {
      // Arrange
      const initialCart = [mockCartItem];
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider initialCart={initialCart}>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCart(), { wrapper });

      // Act
      act(() => {
        result.current.updateQuantity(mockProduct1.id, -1);
      });

      // Assert
      expect(result.current.cart).toHaveLength(0);
    });

    it('should only update the specified product quantity', () => {
      // Arrange
      const initialCart = [
        { ...mockProduct1, quantity: 2 },
        { ...mockProduct2, quantity: 1 }
      ];
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider initialCart={initialCart}>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCart(), { wrapper });

      // Act
      act(() => {
        result.current.updateQuantity(mockProduct1.id, 10);
      });

      // Assert
      expect(result.current.cart[0].quantity).toBe(10);
      expect(result.current.cart[1].quantity).toBe(1);
    });

    it('should handle updating non-existent product gracefully', () => {
      // Arrange
      const initialCart = [mockCartItem];
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider initialCart={initialCart}>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCart(), { wrapper });

      // Act
      act(() => {
        result.current.updateQuantity(999, 5);
      });

      // Assert
      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0].quantity).toBe(2); // unchanged
    });
  });

  describe('clearCart', () => {
    it('should remove all items from cart', () => {
      // Arrange
      const initialCart = [
        { ...mockProduct1, quantity: 2 },
        { ...mockProduct2, quantity: 3 }
      ];
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider initialCart={initialCart}>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCart(), { wrapper });

      // Act
      act(() => {
        result.current.clearCart();
      });

      // Assert
      expect(result.current.cart).toEqual([]);
    });

    it('should handle clearing an already empty cart', () => {
      // Arrange
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider
      });

      // Act
      act(() => {
        result.current.clearCart();
      });

      // Assert
      expect(result.current.cart).toEqual([]);
    });
  });

  describe('setSaleDiscount', () => {
    it('should update the sale discount value', () => {
      // Arrange
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider
      });

      // Act
      act(() => {
        result.current.setSaleDiscount(0.25);
      });

      // Assert
      expect(result.current.saleDiscount).toBe(0.25);
    });

    it('should update discount from initial value', () => {
      // Arrange
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider initialDiscount={0.1}>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCart(), { wrapper });

      // Act
      act(() => {
        result.current.setSaleDiscount(0.2);
      });

      // Assert
      expect(result.current.saleDiscount).toBe(0.2);
    });

    it('should allow setting discount to 0', () => {
      // Arrange
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CartProvider initialDiscount={0.15}>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCart(), { wrapper });

      // Act
      act(() => {
        result.current.setSaleDiscount(0);
      });

      // Assert
      expect(result.current.saleDiscount).toBe(0);
    });

    it('should allow setting discount to 1 (100%)', () => {
      // Arrange
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider
      });

      // Act
      act(() => {
        result.current.setSaleDiscount(1);
      });

      // Assert
      expect(result.current.saleDiscount).toBe(1);
    });
  });

  describe('Integration: Complex cart operations', () => {
    it('should handle multiple operations in sequence', () => {
      // Arrange
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider
      });

      // Act
      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
        result.current.addToCart(mockProduct1);
        result.current.updateQuantity(mockProduct2.id, 3);
        result.current.setSaleDiscount(0.15);
      });

      // Assert
      expect(result.current.cart).toHaveLength(2);
      expect(result.current.cart[0].quantity).toBe(2);
      expect(result.current.cart[1].quantity).toBe(3);
      expect(result.current.saleDiscount).toBe(0.15);
    });

    it('should maintain cart state after adding and removing items', () => {
      // Arrange
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider
      });

      // Act
      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
        result.current.removeFromCart(mockProduct1.id);
        result.current.addToCart(mockProduct1);
      });

      // Assert
      expect(result.current.cart).toHaveLength(2);
      expect(result.current.cart.find(item => item.id === mockProduct1.id)?.quantity).toBe(1);
    });
  });
});
