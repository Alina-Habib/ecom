import { useState } from "react";
import api from "../api";
import { useLocation, useNavigate, Link } from "react-router-dom";

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(location.state?.message || "");

    const login = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/login", { email, password });

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="container auth-shell">
            <div className="card">
                <div className="card-topline">Welcome back</div>
                <h1>Login</h1>

                <form onSubmit={login}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>
                </form>

                <p className="helper-text">{message}</p>

                <div className="auth-links">
                    <Link to="/register">Create Account</Link>
                    <Link to="/forgot">Forgot Password?</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;