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

      global.fetch = vi.fn()
        .mockResolvedValueOnce({ ok: true, json: async () => mockProducts[0] })
        .mockResolvedValueOnce({ ok: true, json: async () => mockProducts[1] })
        .mockResolvedValueOnce({ ok: true, json: async () => null })
        .mockResolvedValueOnce({ ok: true, json: async () => null })

      const products = await ProductService.fetchAll()

      expect(products).toHaveLength(2)
      expect(products[0].name).toBe('Apple')
      expect(products[1].name).toBe('Orange')
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
      global.fetch = vi.fn()
        .mockResolvedValueOnce({ ok: true, json: async () => ({ id: '1', name: 'Apple', price: 1.99, reviews: [], inStock: true }) })
        .mockResolvedValueOnce({ ok: true, json: async () => null })
        .mockResolvedValueOnce({ ok: true, json: async () => undefined })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ id: '2', name: 'Orange', price: 2.49, reviews: [], inStock: true }) })

      const products = await ProductService.fetchAll()

      expect(products).toHaveLength(2)
      expect(products[0].name).toBe('Apple')
      expect(products[1].name).toBe('Orange')
    })
  })

  describe('fetchById', () => {
    it('should fetch product by id', async () => {
      const mockProduct = { id: '1', name: 'Apple', price: 1.99, reviews: [], inStock: true }

      global.fetch = vi.fn()
        .mockResolvedValueOnce({ ok: true, json: async () => mockProduct })
        .mockResolvedValueOnce({ ok: true, json: async () => null })
        .mockResolvedValueOnce({ ok: true, json: async () => null })
        .mockResolvedValueOnce({ ok: true, json: async () => null })

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
