import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProductService, ApiError } from './api'

describe('ProductService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchAll', () => {
    it('should fetch all products successfully', async () => {
      const mockProducts = [
        { id: '1', name: 'Apple', price: 1.99, reviews: [], inStock: true },
        { id: '2', name: 'Orange', price: 2.49, reviews: [], inStock: true },
      ]

      // Mock fetch for all 14 products (4 original + 10 exotic)
      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url.includes('apple.json')) {
          return Promise.resolve({ ok: true, json: async () => mockProducts[0] });
        }
        if (url.includes('orange.json')) {
          return Promise.resolve({ ok: true, json: async () => mockProducts[1] });
        }
        return Promise.resolve({ ok: true, json: async () => ({ id: url, name: 'Product', price: 1, reviews: [], inStock: true }) });
      });

      const products = await ProductService.fetchAll()

      expect(products.length).toBeGreaterThanOrEqual(2)
      const apple = products.find(p => p.name === 'Apple');
      const orange = products.find(p => p.name === 'Orange');
      expect(apple).toBeDefined();
      expect(orange).toBeDefined();
    })

    it('should throw ApiError when fetch fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      await expect(ProductService.fetchAll()).rejects.toThrow(ApiError)
    })

    it('should filter out null products', async () => {
      let callCount = 0;
      global.fetch = vi.fn().mockImplementation(() => {
        callCount++;
        if (callCount === 1) return Promise.resolve({ ok: true, json: async () => ({ id: '1', name: 'Apple', price: 1.99, reviews: [], inStock: true }) });
        if (callCount === 2) return Promise.resolve({ ok: true, json: async () => null });
        if (callCount === 3) return Promise.resolve({ ok: true, json: async () => undefined });
        if (callCount === 4) return Promise.resolve({ ok: true, json: async () => ({ id: '2', name: 'Orange', price: 2.49, reviews: [], inStock: true }) });
        return Promise.resolve({ ok: true, json: async () => ({ id: `${callCount}`, name: `Product${callCount}`, price: 1, reviews: [], inStock: true }) });
      });

      const products = await ProductService.fetchAll()

      const apple = products.find(p => p.name === 'Apple');
      const orange = products.find(p => p.name === 'Orange');
      expect(apple).toBeDefined();
      expect(orange).toBeDefined();
      expect(products.every(p => p !== null && p !== undefined)).toBe(true);
    })
  })

  describe('fetchById', () => {
    it('should fetch product by id', async () => {
      const mockProduct = { id: '1', name: 'Apple', price: 1.99, reviews: [], inStock: true }

      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url.includes('apple.json')) {
          return Promise.resolve({ ok: true, json: async () => mockProduct });
        }
        return Promise.resolve({ ok: true, json: async () => ({ id: url, name: 'Product', price: 1, reviews: [], inStock: true }) });
      });

      const product = await ProductService.fetchById('1')

      expect(product).toEqual(mockProduct)
    })

    it('should return null when product not found', async () => {
      global.fetch = vi.fn()
        .mockResolvedValue({ ok: true, json: async () => null })

      const product = await ProductService.fetchById('999')

      expect(product).toBeNull()
    })
  })
})
