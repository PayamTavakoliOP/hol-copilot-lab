import { screen } from '@testing-library/react';
import { renderWithRouterAndContext } from '../test/test-utils';
import Header from './Header';

describe('Header', () => {
  it('should render the logo and navigation links', () => {
    renderWithRouterAndContext(<Header />);
    
    expect(screen.getByRole('heading', { name: 'The Daily Harvest' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About Us' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Cart/ })).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('should display the correct number of items in the cart link', () => {
    const mockCart = [
      { id: '1', name: 'Apple', price: 1, image: '', quantity: 2, reviews: [], inStock: true },
      { id: '2', name: 'Orange', price: 1.2, image: '', quantity: 1, reviews: [], inStock: true },
    ];
    
    renderWithRouterAndContext(<Header />, { initialCart: mockCart });

    const cartLink = screen.getByRole('link', { name: /Cart/ });
    expect(cartLink).toHaveTextContent('Cart (3)');
  });

  it('should display "Cart" when the cart is empty', () => {
    renderWithRouterAndContext(<Header />);
    const cartLink = screen.getByRole('link', { name: /Cart/ });
    expect(cartLink).toHaveTextContent('Cart');
  });

  it('should have correct href attributes for links', () => {
    renderWithRouterAndContext(<Header />);
    
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products');
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /Cart/ })).toHaveAttribute('href', '/cart');
    expect(screen.getByRole('link', { name: 'Admin Login' })).toHaveAttribute('href', '/login');
  });
});
