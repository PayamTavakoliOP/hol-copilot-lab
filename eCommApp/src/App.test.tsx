import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('should render without crashing', () => {
    // Arrange & Act
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Assert
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('should render skip to main content link', () => {
    // Arrange & Act
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Assert
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(skipLink).toHaveClass('skip-link');
  });

  it('should render HomePage at root path', () => {
    // Arrange & Act
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    
    // Assert
    expect(screen.getByRole('heading', { name: 'Welcome to The Daily Harvest!' })).toBeInTheDocument();
  });

  it('should render ProductsPage at /products path', async () => {
    // Arrange & Act
    render(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    );
    
    // Assert - ProductsPage shows loading initially
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('should render LoginPage at /login path', () => {
    // Arrange & Act
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    
    // Assert
    expect(screen.getByRole('heading', { name: 'Admin Login' })).toBeInTheDocument();
  });

  it('should render AdminPage at /admin path', () => {
    // Arrange & Act
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <App />
      </MemoryRouter>
    );
    
    // Assert
    expect(screen.getByRole('heading', { name: 'Admin Portal' })).toBeInTheDocument();
  });

  it('should render CartPage at /cart path', () => {
    // Arrange & Act
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>
    );
    
    // Assert
    expect(screen.getByRole('heading', { name: 'Your Cart' })).toBeInTheDocument();
  });

  it('should render AboutPage at /about path', () => {
    // Arrange & Act
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    
    // Assert
    expect(screen.getByRole('heading', { name: 'About The Daily Harvest' })).toBeInTheDocument();
  });

  it('should wrap routes with CartProvider', () => {
    // Arrange & Act
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>
    );
    
    // Assert - If CartProvider is working, CartPage should show empty cart message
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });
});
