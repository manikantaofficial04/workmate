import React from "react";
import {
  ArrowLeft,
  UserRound,
  Folder,
  Wallet,
  Crown,
  LockKeyhole,
  CircleHelp,
  LogOut,
  ChevronRight,
  BadgeCheck,
  BookOpen,
} from "lucide-react";

import "./profilesetup.css";

function ProfileSetup({
  user,
  onBack,
  onWorkProfile,
  onOfficeAssets,
  onPayrollTax,
  onChangePassword,
  onVersioning,
  onFAQ,
  onLogout,
}) {
  // ACCOUNT MENU

  const accountItems = [
    {
      title: "My Work Profile",
      icon: UserRound,
      action: onWorkProfile,
    },
    {
      title: "Office Assets",
      icon: Folder,
      action: onOfficeAssets,
    },
    {
      title: "Payroll & Tax",
      icon: Wallet,
      action: onPayrollTax,
    },
    {
      title: "Roles",
      icon: Crown,
    },
  ];

  // SETTINGS MENU

  const settingsItems = [
    {
      title: "Change Password",
      icon: LockKeyhole,
      action: onChangePassword,
    },
    {
      title: "Versioning",
      icon: BookOpen,
      action: onVersioning,
    },
    {
      title: "FAQ and Help",
      icon: CircleHelp,
      action: onFAQ,
    },
    {
      title: "Logout",
      icon: LogOut,
      logout: true,
      action: onLogout,
    },
  ];

  // RENDER MENU ITEMS

  const renderItems = (items) =>
    items.map((item) => {
      const Icon = item.icon;

      return (
        <button
          type="button"
          className={`profile-menu-item ${
            item.logout ? "logout-item" : ""
          }`}
          key={item.title}
          onClick={
            item.action ||
            (() => alert(`${item.title} page will be developed next.`))
          }
        >
          <Icon size={17} />

          <span>{item.title}</span>

          <ChevronRight
            size={17}
            className="profile-chevron"
          />
        </button>
      );
    });

  return (
    <main className="profile-setup-page">

      {/* PURPLE HEADER */}

      <header className="profile-header">
        <button
          className="profile-back-button"
          onClick={onBack}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <h1>My Profile</h1>
      </header>

      {/* PROFILE INFORMATION */}

      <section className="profile-main-card">

        <div className="profile-avatar">
          <UserRound size={42} />
        </div>

        <div className="profile-user-info">
          <h2>
            {user?.fullName || "Your Name"}

            <BadgeCheck
              size={17}
              fill="#7954ff"
              color="#7954ff"
            />
          </h2>

          <p>{user?.email || "Your Email"}</p>
        </div>

        {/* ACCOUNT */}

        <section className="profile-section">
          <h3>ACCOUNT</h3>

          <div className="profile-menu-card">
            {renderItems(accountItems)}
          </div>
        </section>

        {/* SETTINGS */}

        <section className="profile-section">
          <h3>SETTINGS</h3>

          <div className="profile-menu-card">
            {renderItems(settingsItems)}
          </div>
        </section>

      </section>

    </main>
  );
}

export default ProfileSetup;
