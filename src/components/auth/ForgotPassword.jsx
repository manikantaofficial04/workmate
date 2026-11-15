import React, { useState } from "react";

import {
  Mail,
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import "./ForgotPassword.css";

function ForgotPassword({
  demoOTP,
  onBack,
  onSendOTP,
  onResetPassword,
}) {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  // =====================================
  // STEP 1 - SEND OTP
  // =====================================

  const handleSendOTP = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);

    try {
      const result = await onSendOTP(email.trim().toLowerCase());

      if (result) {
        setStep(2);
        setSuccess("OTP generated successfully.");
      }
    } catch (err) {
      setError(err.message || "Unable to generate OTP.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // STEP 2 - VERIFY OTP
  // =====================================

  const handleVerifyOTP = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!otp.trim()) {
      setError("Please enter your OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (otp !== demoOTP) {
      setError("Incorrect OTP. Please try again.");
      return;
    }

    setSuccess("OTP verified successfully!");

    setStep(3);
  };

  // =====================================
  // STEP 3 - RESET PASSWORD
  // =====================================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await onResetPassword(email, password);

      setSuccess("Password reset successfully!");

      setStep(4);
    } catch (err) {
      setError(err.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // BACK BUTTON
  // =====================================

  const handleBack = () => {
    setError("");
    setSuccess("");

    if (step === 1) {
      onBack?.();
    } else {
      setStep((prev) => prev - 1);
    }
  };

  // =====================================
  // MAIN UI
  // =====================================

  return (
    <main className="forgot-page">

      <div className="forgot-card">

        {/* BACK BUTTON */}

        <button
          type="button"
          className="forgot-back"
          onClick={handleBack}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* =================================
            STEP 1 - EMAIL
        ================================= */}

        {step === 1 && (
          <>
            <div className="forgot-icon">
              <Mail size={30} />
            </div>

            <div className="forgot-heading">
              <h1>Forgot Password?</h1>

              <p>
                Don't worry! Enter your registered email
                address to reset your password.
              </p>
            </div>

            <form onSubmit={handleSendOTP}>

              <div className="forgot-field">

                <label>Email Address</label>

                <div className="forgot-input">
                  <Mail size={19} />

                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

              </div>

              {error && (
                <p className="forgot-error">{error}</p>
              )}

              <button
                type="submit"
                className="forgot-submit"
                disabled={loading}
              >
                {loading ? "Generating OTP..." : "Send OTP"}
              </button>

            </form>
          </>
        )}

        {/* =================================
            STEP 2 - OTP VERIFICATION
        ================================= */}

        {step === 2 && (
          <>
            <div className="forgot-icon">
              <ShieldCheck size={30} />
            </div>

            <div className="forgot-heading">
              <h1>Verify OTP</h1>

              <p>
                Enter the 6-digit verification code generated
                for your registered email address.
              </p>
            </div>

            <form onSubmit={handleVerifyOTP}>

              <div className="forgot-field">

                <label>Verification Code</label>

                <div className="forgot-input">
                  <ShieldCheck size={19} />

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>

              </div>

              {error && (
                <p className="forgot-error">{error}</p>
              )}

              {success && (
                <p className="forgot-success">{success}</p>
              )}

              <button
                type="submit"
                className="forgot-submit"
              >
                Verify OTP
              </button>

            </form>
          </>
        )}

        {/* =================================
            STEP 3 - NEW PASSWORD
        ================================= */}

        {step === 3 && (
          <>
            <div className="forgot-icon">
              <LockKeyhole size={30} />
            </div>

            <div className="forgot-heading">
              <h1>Create New Password</h1>

              <p>
                Your OTP is verified. Create a new password
                for your Workmate account.
              </p>
            </div>

            <form onSubmit={handleResetPassword}>

              {/* NEW PASSWORD */}

              <div className="forgot-field">

                <label>New Password</label>

                <div className="forgot-input">

                  <LockKeyhole size={19} />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="forgot-eye"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <Eye size={19} />
                    ) : (
                      <EyeOff size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* CONFIRM PASSWORD */}

              <div className="forgot-field">

                <label>Confirm Password</label>

                <div className="forgot-input">

                  <LockKeyhole size={19} />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                  />

                  <button
                    type="button"
                    className="forgot-eye"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? (
                      <Eye size={19} />
                    ) : (
                      <EyeOff size={19} />
                    )}
                  </button>

                </div>

              </div>

              <p className="forgot-password-hint">
                Password must contain at least 8 characters.
              </p>

              {error && (
                <p className="forgot-error">{error}</p>
              )}

              <button
                type="submit"
                className="forgot-submit"
                disabled={loading}
              >
                {loading ? "Updating Password..." : "Reset Password"}
              </button>

            </form>
          </>
        )}

        {/* =================================
            STEP 4 - SUCCESS
        ================================= */}

        {step === 4 && (
          <div className="forgot-complete">

            <div className="forgot-success-icon">
              <CheckCircle size={60} />
            </div>

            <h1>Password Reset Successful!</h1>

            <p>
              Your Workmate password has been updated
              successfully. You can now sign in using
              your new password.
            </p>

            <button
              type="button"
              className="forgot-submit"
              onClick={onBack}
            >
              Back to Sign In
            </button>

          </div>
        )}

      </div>

    </main>
  );
}

export default ForgotPassword;