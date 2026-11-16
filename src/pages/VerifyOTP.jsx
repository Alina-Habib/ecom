import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
    const navigate = useNavigate();
    const email = localStorage.getItem("verifyEmail");

    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    const verify = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/verify-otp", { email, otp });

            setMessage(res.data.message);
            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Verification failed"
            );
        }
    };

    const resend = async () => {
        try {
            const res = await api.post("/resend-otp", { email });

            setMessage(res.data.message);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to resend OTP"
            );
        }
    };

    return (
        <div className="container auth-shell">
            <div className="card">
                <div className="card-topline">Verify identity</div>
                <h1>Verify Email</h1>
                <p className="helper-copy">OTP sent to: {email}</p>

                <form onSubmit={verify}>
                    <input
                        placeholder="Enter 6 digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    <button type="submit">Verify OTP</button>
                    <button type="button" className="secondary-action" onClick={resend}>
                        Resend OTP
                    </button>
                </form>

                <p className="helper-text">{message}</p>
            </div>
        </div>
    );
}

export default VerifyOTP;