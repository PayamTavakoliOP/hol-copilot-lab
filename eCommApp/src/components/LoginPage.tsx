import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            setLoginError('');
            setUsername('');
            setPassword('');
            navigate('/admin');
        } else {
            setLoginError('Invalid credentials');
        }
    };

    return (
        <div className="app">
            <Header />
            <main id="main-content" className="main-content">
                <div className="login-container">
                    <h2>Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                autoFocus
                                required
                                aria-required="true"
                                aria-invalid={loginError ? 'true' : 'false'}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                aria-required="true"
                                aria-invalid={loginError ? 'true' : 'false'}
                            />
                        </div>
                        <button type="submit">Login</button>
                        {loginError && (
                            <p role="alert" aria-live="polite" className="error-message">
                                {loginError}
                            </p>
                        )}
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LoginPage;
