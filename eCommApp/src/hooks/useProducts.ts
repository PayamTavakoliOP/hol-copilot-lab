import { useState, useEffect } from 'react'
import { Product } from '../types'
import { ProductService, ApiError } from '../services/api'

interface UseProductsResult {
  products: Product[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ProductService.fetchAll()
      setProducts(data)
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? `${err.message} (${err.status || 'Network error'})`
          : 'An unexpected error occurred while loading products'
      setError(errorMessage)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  }
}
