import React, { useState } from "react";
import "./onboarding.css";

// PAGE 1 IMAGES
import meetingImage from "../../assets/today-meeting.png";
import taskImage from "../../assets/today-task.png";

// PAGE 2 IMAGES
import workingPeriodImage from "../../assets/working-period.png";
import workingLevelImage from "../../assets/working-level.png";

// PAGE 3 IMAGES
import achievementImage from "../../assets/achievement.png";
import taskPage3Image from "../../assets/today-task-page3.png";

// PAGE 4 IMAGES
import finalTaskImage from "../../assets/today-task.png";
import finalWorkingImage from "../../assets/working-period.png";

// =====================================
// PAGE 1
// =====================================

function SlideOne() {
  return (
    <>
      <section className="onboarding-hero">
        <div className="illustration-wrapper">
          <img
            src={meetingImage}
            alt="Today Meeting"
            className="meeting-illustration"
          />

          <img
            src={taskImage}
            alt="Today Task"
            className="task-illustration"
          />
        </div>
      </section>

      <section className="onboarding-content">
        <h1>Welcome to Workmate!</h1>

        <p>
          Make Smart Decisions! Set clear timelines for
          projects and celebrate your achievements!
        </p>
      </section>
    </>
  );
}

// =====================================
// PAGE 2
// =====================================

function SlideTwo() {
  return (
    <>
      <section className="onboarding-hero slide-two-hero">
        <div className="slide-two-illustrations">
          <img
            src={workingPeriodImage}
            alt="Working Period"
            className="working-period-image"
          />

          <img
            src={workingLevelImage}
            alt="Working Level"
            className="working-level-image"
          />
        </div>
      </section>

      <section className="onboarding-content">
        <h1>Manage Stress Effectively</h1>

        <p>
          Stay Balanced! Track your workload and maintain
          a healthy stress level with ease.
        </p>
      </section>
    </>
  );
}

// =====================================
// PAGE 3
// =====================================

function SlideThree() {
  return (
    <>
      <section className="onboarding-hero slide-three-hero">
        <div className="slide-three-illustrations">
          <img
            src={achievementImage}
            alt="Achievement"
            className="achievement-image"
          />

          <img
            src={taskPage3Image}
            alt="Today Task"
            className="task-page3-image"
          />
        </div>
      </section>

      <section className="onboarding-content">
        <h1>Plan for Success</h1>

        <p>
          Your Journey Starts Here! Earn achievement
          badges as you conquer your tasks. Let's get started!
        </p>
      </section>
    </>
  );
}

// =====================================
// PAGE 4
// =====================================

function FinalWelcome() {
  return (
    <>
      <section className="onboarding-hero final-hero">
        <div className="illustration-wrapper">
          <img
            src={finalTaskImage}
            alt="Today Task"
            className="final-task-image"
          />

          <img
            src={finalWorkingImage}
            alt="Working Period"
            className="final-working-image"
          />
        </div>
      </section>

      <section className="onboarding-content">
        <h1>
          Navigate Your Work Journey
          <br />
          Efficient & Easy
        </h1>

        <p>
          Increase your work management & career
          development radically
        </p>
      </section>
    </>
  );
}

// =====================================
// SLIDE INDICATORS
// =====================================

function SlideIndicators({ currentSlide }) {
  return (
    <div className="slide-indicators">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className={currentSlide === index ? "active" : ""}
        />
      ))}
    </div>
  );
}

// =====================================
// MAIN COMPONENT
// =====================================

export default function Onboarding({
  onNext,
  onSkip,
  onSignIn,
  onSignUp
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < 3) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    setCurrentSlide(3);
    onSkip?.();
  };

  const handleSignIn = () => {
    if (onSignIn) {
      onSignIn();
    } else {
      onNext?.();
    }
  };

  const handleSignUp = () => {
    onSignUp?.();
  };

  return (
    <main className="onboarding-page">
      <div className="onboarding-container">

        {currentSlide === 0 && <SlideOne />}
        {currentSlide === 1 && <SlideTwo />}
        {currentSlide === 2 && <SlideThree />}
        {currentSlide === 3 && <FinalWelcome />}

        {currentSlide < 3 && (
          <>
            <SlideIndicators currentSlide={currentSlide} />

            <div className="onboarding-actions">
              <button
                className="next-button"
                onClick={handleNext}
              >
                Next
              </button>

              <button
                className="skip-button"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
          </>
        )}

        {currentSlide === 3 && (
          <div className="final-actions">
            <button
              className="final-signin-button"
              onClick={handleSignIn}
            >
              Sign In
            </button>

            <button
              className="final-signup-button"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        )}

      </div>
    </main>
  );
}