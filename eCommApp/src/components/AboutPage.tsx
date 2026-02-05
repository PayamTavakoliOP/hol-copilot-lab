import { useState, FormEvent } from 'react';
import Header from './Header';
import Footer from './Footer';

const AboutPage = () => {
    const [bugReport, setBugReport] = useState({
        name: '',
        email: '',
        description: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // In a real app, this would send the bug report to a server
        console.log('Bug report submitted:', bugReport);
        setSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
            setBugReport({ name: '', email: '', description: '' });
            setSubmitted(false);
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBugReport(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="app">
            <Header />
            <main id="main-content" className="main-content">
                <div className="about-container">
                    <h2>About The Daily Harvest</h2>
                    
                    <section className="about-section">
                        <h3>Our Story</h3>
                        <p>
                            Welcome to The Daily Harvest! We are dedicated to providing fresh, 
                            organic produce directly to your doorstep. Our mission is to make 
                            healthy eating accessible and convenient for everyone.
                        </p>
                    </section>

                    <section className="about-section contact-section">
                        <h3>Contact Information</h3>
                        <div className="contact-info">
                            <p><strong>Email:</strong> support@dailyharvest.com</p>
                            <p><strong>Phone:</strong> 1-800-HARVEST (1-800-427-8378)</p>
                            <p><strong>Address:</strong> 123 Harvest Lane, Fresh Valley, CA 94000</p>
                            <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM PST</p>
                        </div>
                    </section>

                    <section className="about-section bug-report-section">
                        <h3>Report a Bug</h3>
                        <p>
                            Found a bug or issue? We appreciate your feedback! Please use the form 
                            below to report any problems you encounter.
                        </p>
                        
                        {submitted && (
                            <div className="success-message" role="alert">
                                Thank you for your bug report! We&apos;ll look into it shortly.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="bug-report-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={bugReport.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={bugReport.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Bug Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={bugReport.description}
                                    onChange={handleChange}
                                    required
                                    placeholder="Please describe the bug you encountered..."
                                    rows={5}
                                />
                            </div>

                            <button type="submit" className="submit-bug-btn">
                                Submit Bug Report
                            </button>
                        </form>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;
