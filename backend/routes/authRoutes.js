const express = require("express");

const router = express.Router();

const {
    register,
    verifyOTP,
    resendOTP,
    login,
    profile,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");


router.post("/register", register);

router.post("/verify-otp", verifyOTP);

router.post("/resend-otp", resendOTP);

router.post("/login", login);

router.get(
    "/profile",
    authMiddleware,
    profile
);

router.post(
    "/forgot-password",
    forgotPassword
);

router.post(
    "/reset-password",
    resetPassword
);


module.exports = router;