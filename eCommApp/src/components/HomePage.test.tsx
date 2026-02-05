import { screen } from '@testing-library/react';
import { renderWithRouterAndContext } from '../test/test-utils';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('should render the welcome heading', () => {
    // Arrange & Act
    renderWithRouterAndContext(<HomePage />);
    
    // Assert
    expect(screen.getByRole('heading', { name: 'Welcome to The Daily Harvest!' })).toBeInTheDocument();
  });

  it('should render the welcome message', () => {
    // Arrange & Act
    renderWithRouterAndContext(<HomePage />);
    
    // Assert
    expect(screen.getByText('Check out our products page for some great deals.')).toBeInTheDocument();
  });

  it('should render the header component', () => {
    // Arrange & Act
    renderWithRouterAndContext(<HomePage />);
    
    // Assert
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'The Daily Harvest' })).toBeInTheDocument();
  });

  it('should render the footer component', () => {
    // Arrange & Act
    renderWithRouterAndContext(<HomePage />);
    
    // Assert
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/© 2025 The Daily Harvest/)).toBeInTheDocument();
  });

  it('should have main content with correct id for skip navigation', () => {
    // Arrange & Act
    renderWithRouterAndContext(<HomePage />);
    
    // Assert
    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveAttribute('id', 'main-content');
  });
});
