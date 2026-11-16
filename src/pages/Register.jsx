import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const change = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const register = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/register", form);
            navigate("/login", { state: { message: res.data.message } });
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <div className="container auth-shell">
            <div className="card">
                <div className="card-topline">Create account</div>
                <h1>Register</h1>

                <form onSubmit={register}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={change}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={change}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={change}
                    />

                    <button type="submit">Register</button>
                </form>

                <p className="helper-text">{message}</p>
                <Link to="/login" className="auth-link">
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
}

export default Register;