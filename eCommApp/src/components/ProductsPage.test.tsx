import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndContext } from '../test/test-utils';
import ProductsPage from './ProductsPage';
import { vi } from 'vitest';

// Mock product data
const mockProducts = [
  { id: 1, name: 'Apple', price: 1.0, image: 'apple.png', description: 'A crisp, sweet apple.', reviews: [] },
  { id: 2, name: 'Orange', price: 1.2, image: 'orange.png', description: 'A juicy, tangy orange.', reviews: [] },
];

beforeAll(() => {
  global.fetch = vi.fn((url: string) => {
    const product = mockProducts.find(p => url.includes(p.name.toLowerCase()));
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(product),
    });
  }) as any;
});

describe('ProductsPage', () => {
  beforeEach(() => {
    (fetch as any).mockClear();
  });

  it('should render a loading state initially', () => {
    renderWithRouterAndContext(<ProductsPage />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should fetch and display products', async () => {
    renderWithRouterAndContext(<ProductsPage />);
    
    // Wait for products to be loaded and displayed
    expect(await screen.findByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Orange')).toBeInTheDocument();
    
    // Check for product details
    expect(screen.getByText('$1.00')).toBeInTheDocument();
    expect(screen.getByText('$1.20')).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBe(2);
  });

  it('should add a product to the cart when "Add to Cart" is clicked', async () => {
    const { cartContext } = renderWithRouterAndContext(<ProductsPage />);
    
    // Wait for products to load
    await screen.findByText('Apple');

    // Get all "Add to Cart" buttons
    const addToCartButtons = screen.getAllByRole('button', { name: 'Add to Cart' });
    
    // Click the first button (for Apple)
    fireEvent.click(addToCartButtons[0]);

    // Check if addToCart was called with the correct product
    expect(cartContext.addToCart).toHaveBeenCalledTimes(1);
    expect(cartContext.addToCart).toHaveBeenCalledWith(expect.objectContaining({ name: 'Apple' }));
  });

  it('should open the review modal when a product image is clicked', async () => {
    renderWithRouterAndContext(<ProductsPage />);
    
    // Wait for products to load
    await screen.findByText('Apple');

    // Get product image buttons
    const imageButtons = screen.getAllByRole('button', { name: /View reviews for/i });
    
    // Click the first image button
    fireEvent.click(imageButtons[0]);

    // Check if the review modal appears
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Reviews for Apple')).toBeInTheDocument();
  });

  it('should display an error message if fetching products fails', async () => {
    // Mock a failed fetch request
    (fetch as any).mockImplementationOnce(() => Promise.resolve({ ok: false }));

    renderWithRouterAndContext(<ProductsPage />);

    // Check for the error message - now using the error-message role
    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Please try refreshing the page');
  });
});
