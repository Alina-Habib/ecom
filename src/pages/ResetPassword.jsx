import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function ResetPassword() {
    const navigate = useNavigate();
    const email = localStorage.getItem("resetEmail");

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const reset = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/reset-password", {
                email,
                otp,
                password
            });

            setMessage(res.data.message);

            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            setMessage(error.response?.data?.message || "Reset failed");
        }
    };

    return (
        <div className="container auth-shell">
            <div className="card">
                <div className="card-topline">New password</div>
                <h1>Reset Password</h1>

                <form onSubmit={reset}>
                    <input
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Reset Password</button>
                </form>

                <p className="helper-text">{message}</p>
                <Link to="/login" className="auth-link">Back to login</Link>
            </div>
        </div>
    );
}

export default ResetPassword;