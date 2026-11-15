import React, { useState } from "react";

// =====================================
// ONBOARDING
// =====================================

import Onboarding from "./components/onboarding/onboarding";

// =====================================
// AUTHENTICATION
// =====================================

import SignIn from "./components/auth/SignIn";
import Signup from "./components/auth/Signup";
import Terms from "./components/auth/Terms";
import EmailOTP from "./components/auth/EmailOTP";
import ForgotPassword from "./components/auth/ForgotPassword";

// =====================================
// PROFILE
// =====================================

import ProfileWelcome from "./components/auth/ProfileWelcome";
import ProfileSetup from "./components/profile/profilesetup";
import MyWorkProfile from "./components/profile/MyWorkProfile";
import OfficeAssets from "./components/profile/OfficeAssets";
import PayrollTax from "./components/profile/PayrollTax";
import ChangePassword from "./components/profile/ChangePassword";
import Versioning from "./components/profile/Versioning";
import FAQHelp from "./components/profile/FAQHelp";

// =====================================
// HOME
// =====================================

import Home from "./components/home/Home.jsx";

// =====================================
// CLOCK / ATTENDANCE
// =====================================

import Attendance from "./components/attendance/Attendance.jsx";

// =====================================
// TASKS
// =====================================

import Tasks from "./components/tasks/Tasks.jsx";

// =====================================
// EXPENSE
// =====================================

import Expense from "./components/expense/Expense.jsx";

// =====================================
// LEAVE SUMMARY
// =====================================

import LeaveSummary from "./components/leave/LeaveSummary.jsx";

// =====================================
// MESSAGES
// =====================================

import Messages from "./components/messages/Messages.jsx";


function App() {

  // =====================================
  // APPLICATION STATES
  // =====================================

  const [currentPage, setCurrentPage] = useState("onboarding");

  const [registrationData, setRegistrationData] = useState(null);

  const [userEmail, setUserEmail] = useState("");
  const [demoOTP, setDemoOTP] = useState("");

  const [forgotOTP, setForgotOTP] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const [loggedInUser, setLoggedInUser] = useState(null);


  // =====================================
  // GENERATE RANDOM 6-DIGIT OTP
  // =====================================

  const generateOTP = () => {

    const randomArray = new Uint32Array(1);

    crypto.getRandomValues(randomArray);

    return String(randomArray[0] % 1000000).padStart(6, "0");

  };


  // =====================================
  // PASSWORD HASHING
  // =====================================

  const hashPassword = async (password) => {

    const encoder = new TextEncoder();

    const salt = crypto.getRandomValues(new Uint8Array(16));

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveBits"]
    );

    const hash = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      key,
      256
    );

    const passwordHash = Array.from(new Uint8Array(hash))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    const saltString = Array.from(salt)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return {
      passwordHash,
      salt: saltString,
    };

  };


  // =====================================
  // VERIFY CURRENT PASSWORD
  // =====================================

  const verifyPassword = async (
    password,
    storedHash,
    storedSalt
  ) => {

    if (!storedHash || !storedSalt) {
      return false;
    }

    const encoder = new TextEncoder();

    const salt = new Uint8Array(
      storedSalt.match(/.{1,2}/g).map((byte) =>
        parseInt(byte, 16)
      )
    );

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveBits"]
    );

    const hash = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      key,
      256
    );

    const enteredHash = Array.from(new Uint8Array(hash))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return enteredHash === storedHash;

  };


  // =====================================
  // CHANGE PASSWORD
  // =====================================

  const handleChangePassword = async (
    currentPassword,
    newPassword
  ) => {

    if (!loggedInUser?.email) {
      throw new Error("User session not found. Please login again.");
    }

    const users = JSON.parse(
      localStorage.getItem("workmateUsers") || "[]"
    );

    const userIndex = users.findIndex(
      (user) =>
        user.email?.toLowerCase() ===
        loggedInUser.email.toLowerCase()
    );

    if (userIndex === -1) {
      throw new Error("User account not found.");
    }

    const existingUser = users[userIndex];

    // VERIFY CURRENT PASSWORD

    const isPasswordCorrect = await verifyPassword(
      currentPassword,
      existingUser.passwordHash,
      existingUser.salt
    );

    if (!isPasswordCorrect) {
      throw new Error("Current password is incorrect.");
    }

    // CHECK NEW PASSWORD

    if (currentPassword === newPassword) {
      throw new Error(
        "New password must be different from current password."
      );
    }

    // HASH NEW PASSWORD

    const { passwordHash, salt } = await hashPassword(
      newPassword
    );

    // UPDATE USER PASSWORD

    users[userIndex] = {
      ...existingUser,
      passwordHash,
      salt,
      passwordUpdatedAt: new Date().toISOString(),
    };

    // SAVE UPDATED USERS

    localStorage.setItem(
      "workmateUsers",
      JSON.stringify(users)
    );

    return true;

  };


  // =====================================
  // SIGN UP
  // =====================================

  const handleSignup = (data) => {

    setRegistrationData(data);

    setCurrentPage("terms");

  };


  // =====================================
  // ACCEPT TERMS
  // =====================================

  const handleTermsAccept = () => {

    if (!registrationData) {

      setCurrentPage("signup");

      return;

    }

    const newOTP = generateOTP();

    setUserEmail(registrationData.email);

    setDemoOTP(newOTP);

    setCurrentPage("otp");

    alert(`Your Workmate Demo OTP is: ${newOTP}`);

  };


  // =====================================
  // DECLINE TERMS
  // =====================================

  const handleTermsDecline = () => {

    setCurrentPage("signup");

  };


  // =====================================
  // VERIFY REGISTRATION OTP
  // =====================================

  const handleOTPVerify = async (enteredOTP) => {

    if (enteredOTP !== demoOTP) {

      alert("Incorrect OTP. Please try again.");

      return;

    }

    if (!registrationData) {

      alert("Registration details not found.");

      setCurrentPage("signup");

      return;

    }

    try {

      const users = JSON.parse(
        localStorage.getItem("workmateUsers") || "[]"
      );

      // CHECK DUPLICATE EMAIL

      const emailExists = users.some(
        (user) =>
          user.email.toLowerCase() ===
          registrationData.email.toLowerCase()
      );

      // CHECK DUPLICATE COMPANY ID

      const companyExists = users.some(
        (user) =>
          user.employeeId.toLowerCase() ===
          registrationData.companyId.toLowerCase()
      );

      if (emailExists || companyExists) {

        alert("Email or Company ID is already registered.");

        setCurrentPage("signup");

        return;

      }

      // HASH PASSWORD

      const { passwordHash, salt } = await hashPassword(
        registrationData.password
      );

      // CREATE ACCOUNT

      const newUser = {

        fullName: registrationData.companyId,

        employeeId: registrationData.companyId,

        email: registrationData.email.toLowerCase(),

        phone: registrationData.phone,

        passwordHash,

        salt,

        profileCompleted: false,

        createdAt: new Date().toISOString(),

      };

      users.push(newUser);

      localStorage.setItem(
        "workmateUsers",
        JSON.stringify(users)
      );

      const user = {

        fullName: newUser.fullName,

        employeeId: newUser.employeeId,

        email: newUser.email,

        phone: newUser.phone,

        profileCompleted: false,

      };

      setLoggedInUser(user);

      setRegistrationData(null);

      setDemoOTP("");

      setCurrentPage("profileWelcome");

    } catch (error) {

      console.error("Registration error:", error);

      alert("Registration failed. Please try again.");

    }

  };


  // =====================================
  // RESEND REGISTRATION OTP
  // =====================================

  const handleResendOTP = () => {

    const newOTP = generateOTP();

    setDemoOTP(newOTP);

    alert(`Your new Workmate Demo OTP is: ${newOTP}`);

  };


  // =====================================
  // FORGOT PASSWORD - SEND OTP
  // =====================================

  const handleForgotSendOTP = (email) => {

    const users = JSON.parse(
      localStorage.getItem("workmateUsers") || "[]"
    );

    const normalizedEmail = email.trim().toLowerCase();

    const user = users.find(
      (item) =>
        item.email?.toLowerCase() === normalizedEmail
    );

    if (!user) {

      throw new Error(
        "No account found with this email address."
      );

    }

    const newOTP = generateOTP();

    setForgotEmail(normalizedEmail);

    setForgotOTP(newOTP);

    alert(
      `Your Workmate Password Reset Demo OTP is: ${newOTP}`
    );

    return true;

  };


  // =====================================
  // FORGOT PASSWORD - RESET PASSWORD
  // =====================================

  const handlePasswordReset = async (email, newPassword) => {

    const normalizedEmail = email.trim().toLowerCase();

    if (
      !forgotEmail ||
      normalizedEmail !== forgotEmail.toLowerCase()
    ) {

      throw new Error("Email verification failed.");

    }

    const users = JSON.parse(
      localStorage.getItem("workmateUsers") || "[]"
    );

    const userIndex = users.findIndex(
      (user) =>
        user.email?.toLowerCase() === normalizedEmail
    );

    if (userIndex === -1) {

      throw new Error("Account not found.");

    }

    const { passwordHash, salt } = await hashPassword(
      newPassword
    );

    users[userIndex] = {

      ...users[userIndex],

      passwordHash,

      salt,

      passwordUpdatedAt: new Date().toISOString(),

    };

    localStorage.setItem(
      "workmateUsers",
      JSON.stringify(users)
    );

    setForgotEmail("");

    setForgotOTP("");

  };


  // =====================================
  // LOGIN SUCCESS
  // =====================================

  const handleLoginSuccess = (user) => {

    setLoggedInUser(user);

    if (user.profileCompleted) {

      setCurrentPage("dashboard");

    } else {

      setCurrentPage("profileWelcome");

    }

  };


  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout = () => {

    localStorage.removeItem("workmateLoggedInUser");

    sessionStorage.removeItem("workmateLoggedInUser");

    setLoggedInUser(null);

    setCurrentPage("signin");

  };


  // =====================================
  // NAVIGATION
  // =====================================

  const handleNavigation = (page) => {

    switch (page) {

      case "dashboard":
        setCurrentPage("dashboard");
        break;

      case "clock":
      case "attendance":
        setCurrentPage("clock");
        break;

      case "tasks":
        setCurrentPage("tasks");
        break;

      case "expense":
        setCurrentPage("expense");
        break;

      case "leaveSummary":
        setCurrentPage("leaveSummary");
        break;

      case "messages":
        setCurrentPage("messages");
        break;

      case "calendar":
        setCurrentPage("calendar");
        break;

      case "work":
        setCurrentPage("work");
        break;

      default:
        setCurrentPage("dashboard");

    }

  };


  // =====================================
  // MAIN APPLICATION
  // =====================================

  return (

    <div className="app">


      {/* ONBOARDING */}

      {currentPage === "onboarding" && (

        <Onboarding
          onNext={() => setCurrentPage("signin")}
          onSkip={() => setCurrentPage("signin")}
          onSignIn={() => setCurrentPage("signin")}
          onSignUp={() => setCurrentPage("signup")}
        />

      )}


      {/* SIGN UP */}

      {currentPage === "signup" && (

        <Signup
          onContinue={handleSignup}
          onSignIn={() => setCurrentPage("signin")}
        />

      )}


      {/* TERMS */}

      {currentPage === "terms" && (

        <Terms
          onAccept={handleTermsAccept}
          onDecline={handleTermsDecline}
        />

      )}


      {/* REGISTRATION OTP */}

      {currentPage === "otp" && (

        <EmailOTP
          email={userEmail}
          onVerify={handleOTPVerify}
          onResend={handleResendOTP}
        />

      )}


      {/* FORGOT PASSWORD */}

      {currentPage === "forgotPassword" && (

        <ForgotPassword
          demoOTP={forgotOTP}
          onBack={() => {

            setForgotEmail("");

            setForgotOTP("");

            setCurrentPage("signin");

          }}
          onSendOTP={handleForgotSendOTP}
          onResetPassword={handlePasswordReset}
        />

      )}


      {/* PROFILE WELCOME */}

      {currentPage === "profileWelcome" && (

        <ProfileWelcome
          onSetupProfile={() => setCurrentPage("profileSetup")}
          onExplore={() => setCurrentPage("dashboard")}
        />

      )}


      {/* MY PROFILE */}

      {currentPage === "profileSetup" && (

        <ProfileSetup
          user={loggedInUser}
          onBack={() => setCurrentPage("profileWelcome")}
          onWorkProfile={() => setCurrentPage("workProfile")}
          onOfficeAssets={() => setCurrentPage("officeAssets")}
          onPayrollTax={() => setCurrentPage("payrollTax")}
          onChangePassword={() => setCurrentPage("changePassword")}
          onVersioning={() => setCurrentPage("versioning")}
          onFAQ={() => setCurrentPage("faqHelp")}
          onLogout={handleLogout}
        />

      )}


      {/* MY WORK PROFILE */}

      {currentPage === "workProfile" && (

        <MyWorkProfile
          user={loggedInUser}
          onBack={() => setCurrentPage("profileSetup")}
        />

      )}


      {/* OFFICE ASSETS */}

      {currentPage === "officeAssets" && (

        <OfficeAssets
          user={loggedInUser}
          onBack={() => setCurrentPage("profileSetup")}
        />

      )}


      {/* PAYROLL & TAX */}

      {currentPage === "payrollTax" && (

        <PayrollTax
          user={loggedInUser}
          onBack={() => setCurrentPage("profileSetup")}
        />

      )}


      {/* CHANGE PASSWORD */}

      {currentPage === "changePassword" && (

        <ChangePassword
          onBack={() => setCurrentPage("profileSetup")}
          onChangePassword={handleChangePassword}
        />

      )}


      {/* VERSIONING */}

      {currentPage === "versioning" && (

        <Versioning
          onBack={() => setCurrentPage("profileSetup")}
        />

      )}


      {/* FAQ AND HELP */}

      {currentPage === "faqHelp" && (

        <FAQHelp
          onBack={() => setCurrentPage("profileSetup")}
        />

      )}


      {/* SIGN IN */}

      {currentPage === "signin" && (

        <SignIn
          onSignUp={() => setCurrentPage("signup")}
          onLoginSuccess={handleLoginSuccess}
          onForgotPassword={() => setCurrentPage("forgotPassword")}
        />

      )}


      {/* HOME DASHBOARD */}

      {currentPage === "dashboard" && (

        <Home
          user={loggedInUser}
          onNavigate={handleNavigation}
        />

      )}


      {/* CLOCK / ATTENDANCE */}

      {currentPage === "clock" && (

        <Attendance
          user={loggedInUser}
          onNavigate={handleNavigation}
        />

      )}


      {/* TASKS */}

      {currentPage === "tasks" && (

        <Tasks
          onNavigate={handleNavigation}
        />

      )}


      {/* EXPENSE */}

      {currentPage === "expense" && (

        <Expense
          onNavigate={handleNavigation}
        />

      )}


      {/* LEAVE SUMMARY */}

      {currentPage === "leaveSummary" && (

        <LeaveSummary
          onNavigate={handleNavigation}
        />

      )}


      {/* MESSAGES */}

      {currentPage === "messages" && (

        <Messages
          onBack={() => setCurrentPage("dashboard")}
        />

      )}


      {/* CALENDAR */}

      {currentPage === "calendar" && (

        <div className="dashboard">

          <h2>Calendar</h2>

          <p>Calendar page will be developed next.</p>

          <button onClick={() => setCurrentPage("dashboard")}>
            Back to Home
          </button>

        </div>

      )}


      {/* WORK */}

      {currentPage === "work" && (

        <div className="dashboard">

          <h2>My Work</h2>

          <p>My Work page will be developed next.</p>

          <button onClick={() => setCurrentPage("dashboard")}>
            Back to Home
          </button>

        </div>

      )}

    </div>

  );

}

export default App;