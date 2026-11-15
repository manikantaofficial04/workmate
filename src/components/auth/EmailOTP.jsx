import React, { useState, useRef } from "react";
import { Mail } from "lucide-react";
import "./EmailOTP.css";

function EmailOTP({ email, onVerify, onResend }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOTP = [...otp];
    updatedOTP[index] = value;

    setOtp(updatedOTP);
    setError("");
    setMessage("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    e.preventDefault();

    const updatedOTP = [...otp];

    pasted.split("").forEach((digit, index) => {
      updatedOTP[index] = digit;
    });

    setOtp(updatedOTP);

    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    onVerify?.(code);
  };

  const handleResend = async () => {
    setError("");
    setMessage("");

    try {
      await onResend?.();
      setOtp(["", "", "", "", "", ""]);
      setMessage("A new verification code has been requested.");
      inputRefs.current[0]?.focus();
    } catch {
      setError("Unable to resend code. Please try again.");
    }
  };

  return (
    <div className="otp-page">

      <div className="otp-container">

        <div className="otp-icon">
          <Mail size={65} />
        </div>

        <h1>Email Verification Sent!</h1>

        <p className="otp-description">
          A verification code will be sent to the email
          <strong> {email || "your email"}</strong> for your
          account verification process.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="otp-inputs">

            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}

          </div>

          <p className="otp-resend">
            Haven't received the verification code?

            <button type="button" onClick={handleResend}>
              Resend it.
            </button>
          </p>

          {error && <p className="otp-error">{error}</p>}

          {message && <p className="otp-success">{message}</p>}

          <button type="submit" className="otp-submit">
            Submit
          </button>

        </form>

      </div>

    </div>
  );
}

export default EmailOTP;