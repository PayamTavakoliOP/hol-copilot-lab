import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndContext } from '../test/test-utils';
import AdminPage from './AdminPage';

describe('AdminPage', () => {
  it('should apply a valid discount when Set Sale button is clicked', () => {
    const { cartContext } = renderWithRouterAndContext(<AdminPage />);
    const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
    const button = screen.getByRole('button', { name: 'Apply sale percentage' });

    fireEvent.change(input, { target: { value: '15' } });
    fireEvent.click(button);

    expect(cartContext.setSaleDiscount).toHaveBeenCalledWith(0.15);
    expect(screen.getByText('All products are 15% off!')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('All products are 15% off!');
  });

  it('should show an error message for a discount over 100', () => {
    const { cartContext } = renderWithRouterAndContext(<AdminPage />);
    const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
    const button = screen.getByRole('button', { name: 'Apply sale percentage' });

    fireEvent.change(input, { target: { value: '110' } });
    fireEvent.click(button);

    expect(cartContext.setSaleDiscount).not.toHaveBeenCalled();
    expect(screen.getByText('Sale percentage must be between 0 and 100.')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should show an error message for a negative discount', () => {
    const { cartContext } = renderWithRouterAndContext(<AdminPage />);
    const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
    const button = screen.getByRole('button', { name: 'Apply sale percentage' });

    fireEvent.change(input, { target: { value: '-10' } });
    fireEvent.click(button);

    expect(cartContext.setSaleDiscount).not.toHaveBeenCalled();
    expect(screen.getByText('Sale percentage must be between 0 and 100.')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should clear the sale when End Sale button is clicked', () => {
    const { cartContext } = renderWithRouterAndContext(<AdminPage />);
    const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
    const setSaleButton = screen.getByRole('button', { name: 'Apply sale percentage' });
    const endSaleButton = screen.getByRole('button', { name: 'Clear sale and set to 0%' });

    // First set a sale
    fireEvent.change(input, { target: { value: '20' } });
    fireEvent.click(setSaleButton);
    expect(cartContext.setSaleDiscount).toHaveBeenCalledWith(0.2);
    expect(screen.getByText('All products are 20% off!')).toBeInTheDocument();

    // Then clear it
    fireEvent.click(endSaleButton);

    expect(cartContext.setSaleDiscount).toHaveBeenCalledWith(0);
    expect(screen.getByText('No sale active.')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('No sale active.');
  });
});
