import { describe, it, expect } from 'vitest';
import { formatPrice, calculateTotal, validateEmail } from './helpers';

describe('helpers', () => {
  describe('formatPrice', () => {
    it('should format a price as USD currency', () => {
      // Arrange
      const price = 10.5;
      
      // Act
      const result = formatPrice(price);
      
      // Assert
      expect(result).toBe('$10.50');
    });

    it('should format whole numbers with two decimal places', () => {
      // Arrange
      const price = 20;
      
      // Act
      const result = formatPrice(price);
      
      // Assert
      expect(result).toBe('$20.00');
    });

    it('should format zero correctly', () => {
      // Arrange
      const price = 0;
      
      // Act
      const result = formatPrice(price);
      
      // Assert
      expect(result).toBe('$0.00');
    });

    it('should handle large numbers', () => {
      // Arrange
      const price = 1234.56;
      
      // Act
      const result = formatPrice(price);
      
      // Assert
      expect(result).toBe('$1,234.56');
    });
  });

  describe('calculateTotal', () => {
    it('should calculate total for multiple items', () => {
      // Arrange
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 }
      ];
      
      // Act
      const result = calculateTotal(items);
      
      // Assert
      expect(result).toBe(35); // (10*2) + (5*3) = 20 + 15 = 35
    });

    it('should return zero for an empty array', () => {
      // Arrange
      const items: Array<{ price: number; quantity: number }> = [];
      
      // Act
      const result = calculateTotal(items);
      
      // Assert
      expect(result).toBe(0);
    });

    it('should handle items with zero quantity', () => {
      // Arrange
      const items = [
        { price: 10, quantity: 0 },
        { price: 5, quantity: 2 }
      ];
      
      // Act
      const result = calculateTotal(items);
      
      // Assert
      expect(result).toBe(10); // (10*0) + (5*2) = 0 + 10 = 10
    });

    it('should handle decimal prices and quantities', () => {
      // Arrange
      const items = [
        { price: 1.5, quantity: 3 },
        { price: 2.25, quantity: 2 }
      ];
      
      // Act
      const result = calculateTotal(items);
      
      // Assert
      expect(result).toBe(9); // (1.5*3) + (2.25*2) = 4.5 + 4.5 = 9
    });

    it('should handle a single item', () => {
      // Arrange
      const items = [{ price: 15.99, quantity: 1 }];
      
      // Act
      const result = calculateTotal(items);
      
      // Assert
      expect(result).toBe(15.99);
    });
  });

  describe('validateEmail', () => {
    it('should return true for a valid email address', () => {
      // Arrange
      const email = 'test@example.com';
      
      // Act
      const result = validateEmail(email);
      
      // Assert
      expect(result).toBe(true);
    });

    it('should return true for email with subdomain', () => {
      // Arrange
      const email = 'user@mail.example.com';
      
      // Act
      const result = validateEmail(email);
      
      // Assert
      expect(result).toBe(true);
    });

    it('should return true for email with plus sign', () => {
      // Arrange
      const email = 'user+tag@example.com';
      
      // Act
      const result = validateEmail(email);
      
      // Assert
      expect(result).toBe(true);
    });

    it('should return false for email without @ symbol', () => {
      // Arrange
      const email = 'invalidemail.com';
      
      // Act
      const result = validateEmail(email);
      
      // Assert
      expect(result).toBe(false);
    });

    it('should return false for email without domain', () => {
      // Arrange
      const email = 'test@';
      
      // Act
      const result = validateEmail(email);
      
      // Assert
      expect(result).toBe(false);
    });

    it('should return false for email without local part', () => {
      // Arrange
      const email = '@example.com';
      
      // Act
      const result = validateEmail(email);
      
      // Assert
      expect(result).toBe(false);
    });

    it('should return false for email with spaces', () => {
      // Arrange
      const email = 'test user@example.com';
      
      // Act
      const result = validateEmail(email);
      
      // Assert
      expect(result).toBe(false);
    });

    it('should return false for empty string', () => {
      // Arrange
      const email = '';
      
      // Act
      const result = validateEmail(email);
      
      // Assert
      expect(result).toBe(false);
    });

    it('should return false for email without TLD', () => {
      // Arrange
      const email = 'test@example';
      
      // Act
      const result = validateEmail(email);
      
      // Assert
      expect(result).toBe(false);
    });
  });
});
