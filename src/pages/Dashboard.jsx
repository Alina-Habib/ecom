import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) return navigate("/login");

        api.get("/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => setUser(res.data))
        .catch(() => {
            localStorage.removeItem("token");
            navigate("/login");
        });

    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard">

            <aside className="sidebar">

                <div className="logo">
                    AuthShield
                </div>

                <nav>
                    <div className="nav-item active">Dashboard</div>
                    <div className="nav-item">Profile</div>
                    <div className="nav-item">Security</div>
                    <div className="nav-item">Activity</div>
                    <div className="nav-item">Settings</div>
                </nav>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </aside>

            <main className="main-content">

                <header className="topbar">

                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome back to your account</p>
                    </div>

                    <div className="user-box">

                        <div className="avatar">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <strong>{user?.name}</strong>
                            <small>{user?.email}</small>
                        </div>

                    </div>

                </header>

                <section className="cards">

                    <div className="stat-card">
                        <h3>Account Status</h3>
                        <p className="success">Verified</p>
                    </div>

                    <div className="stat-card">
                        <h3>Security</h3>
                        <p>Protected</p>
                    </div>

                    <div className="stat-card">
                        <h3>Login Status</h3>
                        <p>Active</p>
                    </div>

                </section>

                <section className="welcome-card">

                    <h2>
                        Welcome, {user?.name}
                    </h2>

                    <p>
                        Your authentication dashboard is ready.
                    </p>

                </section>

                <section className="activity-card">

                    <h2>Recent Activity</h2>

                    <div className="activity-row">
                        <span>Successful Login</span>
                        <span>Active</span>
                    </div>

                    <div className="activity-row">
                        <span>Email Verification</span>
                        <span>Completed</span>
                    </div>

                    <div className="activity-row">
                        <span>Account Created</span>
                        <span>Completed</span>
                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;

