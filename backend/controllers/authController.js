const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/email");

const getOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = (email, code) =>
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is ${code}. Valid for 5 minutes.`
    });

const saveOTP = (user, code) => {
    user.otp = code;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
};


// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser)
            return res.status(400).json({ message: "Email already registered" });

        const hash = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hash,
            verified: true
        });
        await user.save();

        res.status(201).json({ message: "Account created. You can now sign in." });
    } catch (error) {
        console.error("Registration failed:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


// VERIFY OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp)
            return res.status(400).json({ message: "Invalid OTP" });

        if (user.otpExpiry < Date.now())
            return res.status(400).json({ message: "OTP expired" });

        user.verified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.json({ message: "Email verified successfully" });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
};


// RESEND OTP
exports.resendOTP = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user)
            return res.status(404).json({ message: "User not found" });

        const code = getOTP();
        saveOTP(user, code);
        await user.save();
        await sendOTP(user.email, code);

        res.json({ message: "New OTP sent" });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
};


// LOGIN
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user || !await bcrypt.compare(req.body.password, user.password))
            return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
};


// PROFILE
exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
};


// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user)
            return res.status(404).json({ message: "User not found" });

        const code = getOTP();
        saveOTP(user, code);
        await user.save();
        await sendOTP(user.email, code);

        res.json({ message: "Password reset OTP sent" });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
};


// RESET PASSWORD
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp)
            return res.status(400).json({ message: "Invalid OTP" });

        if (user.otpExpiry < Date.now())
            return res.status(400).json({ message: "OTP expired" });

        user.password = await bcrypt.hash(password, 10);
        user.otp = user.otpExpiry = null;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
};