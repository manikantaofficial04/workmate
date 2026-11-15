import React from "react";
import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
  BadgeCheck,
  IdCard,
} from "lucide-react";

import "./MyWorkProfile.css";

function MyWorkProfile({ user, onBack }) {

  const employeeDetails = [
    {
      label: "Employee ID",
      value: user?.employeeId || "Not added yet",
      icon: IdCard,
    },
    {
      label: "Full Name",
      value: user?.fullName || "Not added yet",
      icon: UserRound,
    },
    {
      label: "Email Address",
      value: user?.email || "Not added yet",
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: user?.phone || "Not added yet",
      icon: Phone,
    },
    {
      label: "Designation",
      value: user?.role || "Not added yet",
      icon: BriefcaseBusiness,
    },
  ];

  return (
    <main className="work-profile-page">

      {/* HEADER */}

      <header className="work-profile-header">

        <button
          className="work-profile-back"
          onClick={onBack}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <h1>My Work Profile</h1>

      </header>


      {/* PROFILE CONTENT */}

      <section className="work-profile-content">

        {/* EMPLOYEE CARD */}

        <div className="work-profile-user-card">

          <div className="work-profile-avatar">
            <UserRound size={40} />
          </div>

          <h2>
            {user?.fullName || "Employee"}

            <BadgeCheck
              size={17}
              color="#7954f5"
              fill="#7954f5"
            />
          </h2>

          <p>
            {user?.role || "Employee"}
          </p>

          <span className="work-profile-id">
            ID: {user?.employeeId || "Not added"}
          </span>

        </div>


        {/* EMPLOYEE DETAILS */}

        <section className="work-profile-section">

          <h3>EMPLOYEE INFORMATION</h3>

          <div className="work-profile-details-card">

            {employeeDetails.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  className="work-profile-detail"
                  key={item.label}
                >

                  <div className="work-profile-detail-icon">
                    <Icon size={18} />
                  </div>

                  <div className="work-profile-detail-text">

                    <p>{item.label}</p>

                    <h4>{item.value}</h4>

                  </div>

                </div>
              );

            })}

          </div>

        </section>

      </section>

    </main>
  );
}

export default MyWorkProfile;