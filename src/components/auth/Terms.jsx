import React from "react";
import "./Terms.css";

function Terms({ onAccept, onDecline }) {
  return (
    <div className="terms-page">
      <div className="terms-container">

        <h1>Terms & Conditions and Privacy Policy</h1>

        <div className="terms-content">

          <h3>Terms and Conditions:</h3>

          <p>
            <strong>Acceptance:</strong> By using the Work Mate app,
            you agree to comply with all applicable terms and conditions.
          </p>

          <p>
            <strong>Usage:</strong> This app is for personal and
            authorized workplace use only.
          </p>

          <p>
            <strong>Account:</strong> You are responsible for maintaining
            the security of your account and all activities performed
            through it.
          </p>

          <p>
            <strong>Content:</strong> You must not upload content that
            violates copyright, privacy, or applicable laws.
          </p>

          <p>
            <strong>Changes:</strong> We reserve the right to update
            these terms and conditions when necessary.
          </p>

          <h3>Privacy Policy:</h3>

          <p>
            <strong>Data Collection:</strong> We collect information such
            as email, phone number, and employee identification details
            to manage your account.
          </p>

          <p>
            <strong>Data Usage:</strong> Your information is used for
            account management and providing Work Mate services.
          </p>

          <p>
            <strong>Security:</strong> We use appropriate security
            measures to protect your information.
          </p>

          <p>
            <strong>Data Sharing:</strong> We do not share personal
            information with third parties except when required by law
            or necessary to provide our services.
          </p>

          <p>
            <strong>Your Rights:</strong> You can request access,
            correction, or deletion of your personal information,
            subject to applicable requirements.
          </p>

        </div>

        <div className="terms-actions">

          <button
            className="terms-accept"
            onClick={onAccept}
          >
            I Agree
          </button>

          <button
            className="terms-decline"
            onClick={onDecline}
          >
            Decline
          </button>

        </div>

      </div>
    </div>
  );
}

export default Terms;