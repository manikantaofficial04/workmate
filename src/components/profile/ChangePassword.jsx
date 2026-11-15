import React, { useState } from "react";
import {
  ArrowLeft,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

import "./ChangePassword.css";

function ChangePassword({ onBack, onChangePassword }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password.");
      return;
    }

    try {
      setLoading(true);

      await onChangePassword?.(currentPassword, newPassword);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setSuccess("Your password has been changed successfully.");
    } catch (err) {
      setError(err.message || "Unable to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="change-password-page">

      {/* HEADER */}

      <header className="change-password-header">

        <button
          className="change-password-back"
          onClick={onBack}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <h1>Change Password</h1>

      </header>

      {/* CONTENT */}

      <section className="change-password-content">

        <div className="change-password-icon">
          <ShieldCheck size={35} />
        </div>

        <div className="change-password-heading">

          <h2>Update Your Password</h2>

          <p>
            Create a strong password to keep your Workmate
            account secure.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* CURRENT PASSWORD */}

          <div className="change-password-field">

            <label>Current Password</label>

            <div className="change-password-input">

              <LockKeyhole size={18} />

              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                aria-label="Toggle current password visibility"
              >
                {showCurrent ? <Eye size={19} /> : <EyeOff size={19} />}
              </button>

            </div>

          </div>

          {/* NEW PASSWORD */}

          <div className="change-password-field">

            <label>New Password</label>

            <div className="change-password-input">

              <LockKeyhole size={18} />

              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                aria-label="Toggle new password visibility"
              >
                {showNew ? <Eye size={19} /> : <EyeOff size={19} />}
              </button>

            </div>

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="change-password-field">

            <label>Confirm New Password</label>

            <div className="change-password-input">

              <LockKeyhole size={18} />

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? <Eye size={19} /> : <EyeOff size={19} />}
              </button>

            </div>

          </div>

          <p className="change-password-hint">
            Password must contain at least 8 characters.
          </p>

          {error && (
            <p className="change-password-error">{error}</p>
          )}

          {success && (
            <p className="change-password-success">{success}</p>
          )}

          <button
            type="submit"
            className="change-password-submit"
            disabled={loading}
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>

        </form>

      </section>

    </main>
  );
}

export default ChangePassword;