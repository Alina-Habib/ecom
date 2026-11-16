import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const sendOTP = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/forgot-password", { email });

            setMessage(res.data.message);
            localStorage.setItem("resetEmail", email);
            navigate("/reset");
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed");
        }
    };

    return (
        <div className="container auth-shell">
            <div className="card">
                <div className="card-topline">Account recovery</div>
                <h1>Forgot Password</h1>

                <form onSubmit={sendOTP}>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit">Send OTP</button>
                </form>

                <p className="helper-text">{message}</p>
                <Link to="/login" className="auth-link">Back to login</Link>
            </div>
        </div>
    );
}

export default ForgotPassword;