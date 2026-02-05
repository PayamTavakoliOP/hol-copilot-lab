import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndContext } from '../test/test-utils';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
    it('should render the about heading', () => {
        // Arrange & Act
        renderWithRouterAndContext(<AboutPage />);
        
        // Assert
        expect(screen.getByRole('heading', { name: 'About The Daily Harvest' })).toBeInTheDocument();
    });

    it('should render contact information section', () => {
        // Arrange & Act
        renderWithRouterAndContext(<AboutPage />);
        
        // Assert
        expect(screen.getByRole('heading', { name: 'Contact Information' })).toBeInTheDocument();
        expect(screen.getByText(/support@dailyharvest.com/)).toBeInTheDocument();
        expect(screen.getByText(/1-800-HARVEST/)).toBeInTheDocument();
    });

    it('should render bug report form', () => {
        // Arrange & Act
        renderWithRouterAndContext(<AboutPage />);
        
        // Assert
        expect(screen.getByRole('heading', { name: 'Report a Bug' })).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Bug Description')).toBeInTheDocument();
    });

    it('should submit bug report form', async () => {
        // Arrange
        const user = userEvent.setup();
        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        renderWithRouterAndContext(<AboutPage />);
        
        // Act
        await user.type(screen.getByLabelText('Name'), 'John Doe');
        await user.type(screen.getByLabelText('Email'), 'john@example.com');
        await user.type(screen.getByLabelText('Bug Description'), 'Found a bug in the cart');
        await user.click(screen.getByRole('button', { name: 'Submit Bug Report' }));
        
        // Assert
        expect(consoleLogSpy).toHaveBeenCalledWith('Bug report submitted:', {
            name: 'John Doe',
            email: 'john@example.com',
            description: 'Found a bug in the cart'
        });
        
        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent("Thank you for your bug report! We'll look into it shortly.");
        });

        consoleLogSpy.mockRestore();
    });

    it('should render header and footer', () => {
        // Arrange & Act
        renderWithRouterAndContext(<AboutPage />);
        
        // Assert
        expect(screen.getByRole('banner')).toBeInTheDocument();
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should have main content with correct id for skip navigation', () => {
        // Arrange & Act
        renderWithRouterAndContext(<AboutPage />);
        
        // Assert
        const mainContent = screen.getByRole('main');
        expect(mainContent).toHaveAttribute('id', 'main-content');
    });
});
