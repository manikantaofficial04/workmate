import React from "react";
import { UserRound } from "lucide-react";
import "./ProfileWelcome.css";

function ProfileWelcome({ onSetupProfile, onExplore }) {
  return (
    <main className="profile-welcome-page">

      {/* Blurred Background */}
      <div className="welcome-background">
        <div className="welcome-dashboard-preview">
          <h3>Workmate Dashboard</h3>
          <div className="preview-card"></div>
          <div className="preview-content"></div>
          <div className="preview-content"></div>
        </div>
      </div>

      {/* Bottom Welcome Popup */}
      <section className="welcome-bottom-card">

        {/* Profile Icon */}
        <div className="welcome-profile-icon">
          <UserRound size={42} strokeWidth={2.5} />
        </div>

        <div className="welcome-content">

          <h2>Welcome To Work Mate!</h2>

          <p>
            To enhance your user experience, please set up your
            profile first. This will help us tailor the app to
            your needs and ensure you get the most out of our features!
          </p>

          {/* Set Up Profile */}
          <button
            className="welcome-setup-button"
            onClick={onSetupProfile}
          >
            Set Up My Profile
          </button>

          {/* Explore App */}
          <button
            className="welcome-explore-button"
            onClick={onExplore}
          >
            Explore The App First
          </button>

        </div>

      </section>

    </main>
  );
}

export default ProfileWelcome;