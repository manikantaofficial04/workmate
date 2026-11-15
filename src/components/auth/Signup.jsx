import React, { useState } from "react";
import {
  Mail,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

import "./Signup.css";

function Signup({ onContinue, onSignIn }) {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    companyId: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // Handle phone number
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setFormData((previous) => ({
      ...previous,
      phone: value,
    }));

    setError("");
  };

  // Submit registration form
  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      phone,
      companyId,
      password,
      confirmPassword,
    } = formData;

    // Empty field validation
    if (
      !email.trim() ||
      !phone.trim() ||
      !companyId.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Company ID validation
    if (companyId.trim().length < 3) {
      setError("Company ID must contain at least 3 characters.");
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    // Password matching
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Terms validation
    if (!agreeTerms) {
      setError("Please accept Terms & Conditions and Privacy Policy.");
      return;
    }

    // Pass data to App.jsx
    if (onContinue) {
      onContinue({
        email: email.trim().toLowerCase(),
        phone,
        companyId: companyId.trim(),
        password,
      });
    }
  };

  return (
    <main className="signup-page">

      <div className="signup-container">

        {/* Logo */}
        <div className="signup-logo">
          W
        </div>

        {/* Heading */}
        <h1 className="signup-title">
          Work Mate
        </h1>

        <p className="signup-subtitle">
          Register Using Your Credentials
        </p>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="signup-field">

            <label>Email</label>

            <div className="signup-input">

              <Mail size={18} />

              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* Phone Number */}
          <div className="signup-field">

            <label>Phone Number</label>

            <div className="signup-input phone-input">

              <select aria-label="Country code">
                <option value="+91">IND</option>
                <option value="+1">USA</option>
                <option value="+44">UK</option>
              </select>

              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handlePhoneChange}
                maxLength={10}
              />

            </div>

          </div>

          {/* Company ID */}
          <div className="signup-field">

            <label>Company ID</label>

            <div className="signup-input">

              <Mail size={18} />

              <input
                type="text"
                name="companyId"
                placeholder="Enter Company ID"
                value={formData.companyId}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* Password */}
          <div className="signup-field">

            <label>Password</label>

            <div className="signup-input">

              <LockKeyhole size={18} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="My Password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="signup-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <Eye size={18} />
                ) : (
                  <EyeOff size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}
          <div className="signup-field">

            <label>Confirm Password</label>

            <div className="signup-input">

              <LockKeyhole size={18} />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm My Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                className="signup-eye"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? (
                  <Eye size={18} />
                ) : (
                  <EyeOff size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Terms and Conditions */}
          <div className="signup-terms">

            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => {
                setAgreeTerms(e.target.checked);
                setError("");
              }}
            />

            <span>
              I agree with{" "}
              <a href="#terms">Terms & Conditions</a>
              {" "}and{" "}
              <a href="#privacy">Privacy Policy</a>
            </span>

          </div>

          {/* Error Message */}
          {error && (
            <p className="signup-error">
              {error}
            </p>
          )}

          {/* Sign Up Button */}
          <button
            type="submit"
            className="signup-submit"
          >
            Sign Up
          </button>

        </form>

        {/* Sign In */}
        <div className="signup-footer">

          Already have an account?

          <button
            type="button"
            onClick={onSignIn}
          >
            Sign In here
          </button>

        </div>

      </div>

    </main>
  );
}

export default Signup;