import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getRandomMeme } from '../data/memes';

const HomePage = () => {
    const [memeUrl, setMemeUrl] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const loadMeme = async () => {
        setLoading(true);
        const url = await getRandomMeme();
        setMemeUrl(url);
        setLoading(false);
    };

    useEffect(() => {
        void loadMeme();
    }, []);

    return (
        <div className="app">
            <Header />
            <main id="main-content" className="main-content">
                <h2>Welcome to The Daily Harvest!</h2>
                <p>Check out our products page for some great deals.</p>
                
                <div className="daily-meme-section">
                    <h3>😂 Daily Meme</h3>
                    {loading ? (
                        <div className="meme-loading">Loading today's meme...</div>
                    ) : (
                        <>
                            <img 
                                src={memeUrl} 
                                alt="Daily Meme" 
                                className="daily-meme-image"
                            />
                            <button 
                                onClick={loadMeme} 
                                className="meme-refresh-btn"
                            >
                                🔄 Get Another Meme
                            </button>
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
