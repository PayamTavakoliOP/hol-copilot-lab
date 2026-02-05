import { Product } from '../types'

const PRODUCTS_PATH = import.meta.env.VITE_PRODUCTS_PATH || '/products'

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class ProductService {
  private static productFiles = [
    'apple.json', 
    'grapes.json', 
    'orange.json', 
    'pear.json',
    'dragonfruit.json',
    'rambutan.json',
    'horned-melon.json',
    'durian.json',
    'mangosteen.json',
    'buddha-hand.json',
    'jabuticaba.json',
    'salak.json',
    'cherimoya.json',
    'ackee.json'
  ]

  static async fetchAll(): Promise<Product[]> {
    try {
      const productPromises = this.productFiles.map(async file => {
        const response = await fetch(`${PRODUCTS_PATH}/${file}`)
        
        if (!response.ok) {
          throw new ApiError(
            `Failed to load ${file}`,
            response.status,
            response.statusText
          )
        }
        
        return await response.json()
      })

      const products = await Promise.all(productPromises)
      return products.filter((p): p is Product => p !== null && p !== undefined)
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        'Failed to load products',
        undefined,
        error instanceof Error ? error.message : 'Unknown error'
      )
    }
  }

  static async fetchById(id: string): Promise<Product | null> {
    const products = await this.fetchAll()
    return products.find(p => p.id === id) || null
  }
}
