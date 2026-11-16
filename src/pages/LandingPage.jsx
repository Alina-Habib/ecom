import { Link } from "react-router-dom";

function LandingPage() {
    const features = [
        {
            title: "Secure Login",
            text: "Keep your access protected with a fast and simple sign-in flow."
        },
        {
            title: "Smart Recovery",
            text: "Reset your password quickly with OTP verification and email recovery."
        },
        {
            title: "Dashboard Access",
            text: "See account health and activity in one clear, easy dashboard."
        }
    ];

    return (
        <div className="landing-page">
            <header className="landing-header">
                <div className="brand">AuthFlow</div>

                <nav className="landing-nav">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Sign up</Link>
                </nav>
            </header>

            <main className="landing-hero">
                <div className="hero-copy">
                    <span className="eyebrow">Simple authentication</span>
                    <h1>Secure access for modern apps.</h1>
                    <p>
                        A lightweight front-end for user auth, account verification, and
                        password recovery that feels easy to use from day one.
                    </p>

                    <div className="hero-actions">
                        <Link to="/register" className="primary-btn">Get started</Link>
                        <Link to="/login" className="secondary-btn">Log in</Link>
                    </div>
                </div>

                <div className="hero-panel">
                    <div className="mini-card">
                        <div className="status-dot" />
                        <span>System active</span>
                    </div>

                    <div className="panel-list">
                        <div>
                            <strong>Verified users</strong>
                            <span>2,450+</span>
                        </div>
                        <div>
                            <strong>Protected sessions</strong>
                            <span>99.9%</span>
                        </div>
                        <div>
                            <strong>Support status</strong>
                            <span>Online</span>
                        </div>
                    </div>
                </div>
            </main>

            <section className="features">
                {features.map((feature) => (
                    <article className="feature-card" key={feature.title}>
                        <h3>{feature.title}</h3>
                        <p>{feature.text}</p>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default LandingPage;
