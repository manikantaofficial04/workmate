import React from "react";
import {
  ArrowLeft,
  Smartphone,
  ShieldCheck,
  RefreshCw,
  Info,
  CheckCircle,
  Code,
} from "lucide-react";

import "./Versioning.css";

function Versioning({ onBack }) {

  const appDetails = {
    name: "Workmate",
    version: "1.0.0",
    build: "100",
    releaseDate: "November 2026",
    platform: "Web Application",
    status: "Up to date",
  };

  return (
    <main className="versioning-page">

      {/* HEADER */}

      <header className="versioning-header">

        <button
          className="versioning-back"
          onClick={onBack}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <h1>Versioning</h1>

      </header>

      {/* CONTENT */}

      <section className="versioning-content">

        {/* APP CARD */}

        <div className="versioning-app-card">

          <div className="versioning-app-icon">
            <Smartphone size={38} />
          </div>

          <h2>{appDetails.name}</h2>

          <p>Employee Work Management Application</p>

          <span className="versioning-version-badge">
            Version {appDetails.version}
          </span>

        </div>

        {/* VERSION DETAILS */}

        <section className="versioning-section">

          <h3>APPLICATION INFORMATION</h3>

          <div className="versioning-details-card">

            <div className="versioning-detail-row">

              <div className="versioning-detail-icon">
                <Info size={18} />
              </div>

              <div className="versioning-detail-text">
                <p>App Version</p>
                <h4>{appDetails.version}</h4>
              </div>

            </div>

            <div className="versioning-detail-row">

              <div className="versioning-detail-icon">
                <Code size={18} />
              </div>

              <div className="versioning-detail-text">
                <p>Build Number</p>
                <h4>{appDetails.build}</h4>
              </div>

            </div>

            <div className="versioning-detail-row">

              <div className="versioning-detail-icon">
                <RefreshCw size={18} />
              </div>

              <div className="versioning-detail-text">
                <p>Release Date</p>
                <h4>{appDetails.releaseDate}</h4>
              </div>

            </div>

            <div className="versioning-detail-row">

              <div className="versioning-detail-icon">
                <Smartphone size={18} />
              </div>

              <div className="versioning-detail-text">
                <p>Platform</p>
                <h4>{appDetails.platform}</h4>
              </div>

            </div>

          </div>

        </section>

        {/* UPDATE STATUS */}

        <section className="versioning-section">

          <h3>UPDATE STATUS</h3>

          <div className="versioning-status-card">

            <div className="versioning-status-icon">
              <CheckCircle size={23} />
            </div>

            <div className="versioning-status-text">

              <h4>{appDetails.status}</h4>

              <p>
                You are using the currently configured
                Workmate application version.
              </p>

            </div>

          </div>

        </section>

        {/* SECURITY INFORMATION */}

        <div className="versioning-security-note">

          <ShieldCheck size={20} />

          <p>
            Keep your application updated to access the
            latest improvements and security features.
          </p>

        </div>

        <p className="versioning-footer">
          © 2026 Workmate. All rights reserved.
        </p>

      </section>

    </main>
  );
}

export default Versioning;