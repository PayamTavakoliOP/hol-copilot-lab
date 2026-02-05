import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useProducts } from './useProducts'
import * as api from '../services/api'

vi.mock('../services/api')

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch products successfully', async () => {
    const mockProducts = [
      { id: '1', name: 'Apple', price: 1.99, reviews: [], inStock: true },
      { id: '2', name: 'Orange', price: 2.49, reviews: [], inStock: true },
    ]

    vi.spyOn(api.ProductService, 'fetchAll').mockResolvedValue(mockProducts)

    const { result } = renderHook(() => useProducts())

    expect(result.current.loading).toBe(true)
    expect(result.current.products).toEqual([])
    expect(result.current.error).toBeNull()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.products).toEqual(mockProducts)
    expect(result.current.error).toBeNull()
  })

  it('should handle fetch errors', async () => {
    const mockError = new api.ApiError('Failed to load', 500, 'Internal Server Error')
    vi.spyOn(api.ProductService, 'fetchAll').mockRejectedValue(mockError)

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.products).toEqual([])
    expect(result.current.error).toContain('Network error')
  })

  it('should allow refetching products', async () => {
    const mockProducts = [
      { id: '1', name: 'Apple', price: 1.99, reviews: [], inStock: true },
    ]

    const fetchSpy = vi.spyOn(api.ProductService, 'fetchAll').mockResolvedValue(mockProducts)

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(fetchSpy).toHaveBeenCalledTimes(1)

    await result.current.refetch()

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(2)
    })
  })
})
