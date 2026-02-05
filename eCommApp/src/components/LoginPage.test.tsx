import { screen, fireEvent, findByText, waitFor } from '@testing-library/react';
import { renderWithRouterAndContext } from '../test/test-utils';
import LoginPage from './LoginPage';
import { vi } from 'vitest';

// Mock the useNavigate hook
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('LoginPage', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('should render the login form', () => {
    renderWithRouterAndContext(<LoginPage />);
    
    expect(screen.getByRole('heading', { name: 'Admin Login' })).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('should allow typing into username and password fields', () => {
    renderWithRouterAndContext(<LoginPage />);
    const usernameInput = screen.getByLabelText('Username') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });

  it('should navigate to /admin on successful login', () => {
    renderWithRouterAndContext(<LoginPage />);
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'admin' } });
    fireEvent.click(loginButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/admin');
  });

  it('should show an error message and set aria-invalid on failed login', async () => {
    renderWithRouterAndContext(<LoginPage />);
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'wrong' } });
    fireEvent.change(passwordInput, { target: { value: 'user' } });
    fireEvent.click(loginButton);

    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute('aria-invalid', 'true');
    expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
  });

});
