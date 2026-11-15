import React, { useState } from "react";

import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  Phone,
} from "lucide-react";

import "./SignIn.css";

function SignIn({
  onLoginSuccess,
  onSignUp,
  onForgotPassword,
}) {
  const [loginType, setLoginType] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================
  // PASSWORD HASHING
  // =====================================

  const verifyPassword = async (enteredPassword, user) => {
    if (!user.passwordHash || !user.salt) {
      throw new Error("Invalid account credentials.");
    }

    const salt = new Uint8Array(
      user.salt.match(/.{1,2}/g).map((byte) =>
        parseInt(byte, 16)
      )
    );

    const encoder = new TextEncoder();

    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(enteredPassword),
      "PBKDF2",
      false,
      ["deriveBits"]
    );

    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      256
    );

    const enteredHash = Array.from(
      new Uint8Array(derivedBits)
    )
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return enteredHash === user.passwordHash;
  };

  // =====================================
  // LOGIN FUNCTION
  // =====================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!identifier.trim() || !password) {
      setError("Please enter your login details.");
      return;
    }

    setLoading(true);

    try {
      const users = JSON.parse(
        localStorage.getItem("workmateUsers") || "[]"
      );

      const normalizedIdentifier = identifier.trim();

      const user = users.find((item) => {
        if (loginType === "email") {
          return (
            item.email?.toLowerCase() ===
            normalizedIdentifier.toLowerCase()
          );
        }

        if (loginType === "employeeId") {
          return (
            item.employeeId?.toLowerCase() ===
            normalizedIdentifier.toLowerCase()
          );
        }

        if (loginType === "phone") {
          return item.phone === normalizedIdentifier;
        }

        return false;
      });

      if (!user) {
        setError(
          "Account not found. Please check your details."
        );
        return;
      }

      const passwordValid = await verifyPassword(
        password,
        user
      );

      if (!passwordValid) {
        setError(
          "Incorrect password. Please try again."
        );
        return;
      }

      // =====================================
      // LOGGED-IN USER DETAILS
      // =====================================

      const loggedInUser = {
        fullName: user.fullName,
        employeeId: user.employeeId,
        email: user.email,
        phone: user.phone,
        profileCompleted: user.profileCompleted,
      };

      // =====================================
      // REMEMBER ME
      // =====================================

      const storage = rememberMe
        ? localStorage
        : sessionStorage;

      const otherStorage = rememberMe
        ? sessionStorage
        : localStorage;

      otherStorage.removeItem("workmateLoggedInUser");

      storage.setItem(
        "workmateLoggedInUser",
        JSON.stringify(loggedInUser)
      );

      setSuccess("Login successful!");

      setTimeout(() => {
        onLoginSuccess?.(loggedInUser);
      }, 500);

    } catch (err) {
      console.error("Login error:", err);

      setError(
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // CHANGE LOGIN TYPE
  // =====================================

  const changeLoginType = (type) => {
    setLoginType(type);

    setIdentifier("");
    setPassword("");

    setError("");
    setSuccess("");
  };

  // =====================================
  // FORGOT PASSWORD
  // =====================================

  const handleForgotPassword = () => {
    setError("");
    setSuccess("");

    onForgotPassword?.();
  };

  // =====================================
  // MAIN UI
  // =====================================

  return (
    <main className="signin-page">

      <div className="signin-card">

        <div className="signin-heading">
          <h1>Sign In</h1>
          <p>Sign in to my account</p>
        </div>

        <form onSubmit={handleLogin}>

          {/* EMAIL / EMPLOYEE ID / PHONE */}

          <div className="signin-field">

            <label>
              {loginType === "email"
                ? "Email"
                : loginType === "employeeId"
                ? "Employee ID"
                : "Phone Number"}
            </label>

            <div className="signin-input-wrapper">

              {loginType === "email" ? (
                <Mail size={19} />
              ) : loginType === "employeeId" ? (
                <ShieldCheck size={19} />
              ) : (
                <Phone size={19} />
              )}

              <input
                type={loginType === "email" ? "email" : "text"}
                placeholder={
                  loginType === "email"
                    ? "My Email"
                    : loginType === "employeeId"
                    ? "My Employee ID"
                    : "My Phone Number"
                }
                value={identifier}
                onChange={(e) =>
                  setIdentifier(e.target.value)
                }
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className="signin-field">

            <label>Password</label>

            <div className="signin-input-wrapper">

              <LockKeyhole size={19} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="My Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="signin-eye"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
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

          {/* REMEMBER ME / FORGOT PASSWORD */}

          <div className="signin-options">

            <label className="remember-label">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
              />

              <span>Remember Me</span>

            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>

          </div>

          {/* ERROR */}

          {error && (
            <p className="signin-error">
              {error}
            </p>
          )}

          {/* SUCCESS */}

          {success && (
            <p className="signin-success">
              {success}
            </p>
          )}

          {/* SIGN IN BUTTON */}

          <button
            type="submit"
            className="signin-submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        {/* OR DIVIDER */}

        <div className="signin-divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>

        {/* ALTERNATIVE LOGIN */}

        <div className="alternative-login">

          <button
            type="button"
            className={
              loginType === "employeeId" ? "active" : ""
            }
            onClick={() =>
              changeLoginType("employeeId")
            }
          >
            <ShieldCheck size={19} />
            Sign in With Employee ID
          </button>

          <button
            type="button"
            className={
              loginType === "phone" ? "active" : ""
            }
            onClick={() =>
              changeLoginType("phone")
            }
          >
            <Phone size={19} />
            Sign in With Phone
          </button>

        </div>

        {/* SIGN UP */}

        <p className="signin-register">
          Don't have an account?

          <button
            type="button"
            onClick={onSignUp}
          >
            Sign Up Here
          </button>
        </p>

      </div>

    </main>
  );
}

export default SignIn;