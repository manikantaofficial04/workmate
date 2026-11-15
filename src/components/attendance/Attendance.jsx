import React, { useState } from "react";

import {
  Home,
  ClipboardList,
  Receipt,
  Layers,
  Clock,
  Clock3,
} from "lucide-react";

import "./Attendance.css";

function Attendance({ user, onNavigate }) {

  const [isClockedIn, setIsClockedIn] = useState(false);

  const [todayHours, setTodayHours] = useState("00:00 Hrs");

  const [clockInTime, setClockInTime] = useState(null);

  const attendanceHistory = [
    {
      date: "27 September 2024",
      totalHours: "08:00:00 hrs",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
    },
    {
      date: "26 September 2024",
      totalHours: "08:00:00 hrs",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
    },
    {
      date: "25 September 2024",
      totalHours: "08:10:00 hrs",
      clockIn: "09:00 AM",
      clockOut: "05:10 PM",
    },
  ];


  // CLOCK IN / CLOCK OUT

  const handleClockAction = () => {

    if (!isClockedIn) {

      const currentTime = new Date();

      setClockInTime(currentTime);

      setIsClockedIn(true);

    } else {

      const currentTime = new Date();

      const difference = currentTime - clockInTime;

      const totalMinutes = Math.floor(difference / 60000);

      const hours = Math.floor(totalMinutes / 60);

      const minutes = totalMinutes % 60;

      setTodayHours(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} Hrs`
      );

      setIsClockedIn(false);

      setClockInTime(null);

    }

  };


  return (

    <div className="attendance-page">

      {/* PURPLE HEADER */}

      <section className="attendance-hero">

        <div className="attendance-hero-content">

          <div>
            <h1>Let's Clock-In!</h1>
            <p>Don't miss your clock in schedule</p>
          </div>

          <div className="clock-decoration">
            <Clock size={42} />
            <span>✦</span>
          </div>

        </div>

      </section>


      {/* MAIN CONTENT */}

      <main className="attendance-content">

        {/* WORKING HOURS SUMMARY */}

        <section className="working-summary-card">

          <div className="working-summary-heading">

            <h3>Total Working Hour</h3>

            <p>Paid Period 1 Sept 2024 - 30 Sept 2024</p>

          </div>

          <div className="working-hours-grid">

            <div className="working-hours-box">

              <p>
                <Clock3 size={12} />
                Today
              </p>

              <h2>{todayHours}</h2>

            </div>

            <div className="working-hours-box">

              <p>
                <Clock3 size={12} />
                This Pay Period
              </p>

              <h2>32:00 Hrs</h2>

            </div>

          </div>

          <button
            className={`clock-action-button ${
              isClockedIn ? "clock-out" : ""
            }`}
            onClick={handleClockAction}
          >
            {isClockedIn ? "Clock Out" : "Clock In"}
          </button>

          {isClockedIn && (
            <p className="clock-status">
              Clocked in at{" "}
              {clockInTime?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}

        </section>


        {/* ATTENDANCE HISTORY */}

        <section className="attendance-history">

          {attendanceHistory.map((record, index) => (

            <div className="attendance-record" key={index}>

              <h3>{record.date}</h3>

              <div className="attendance-record-details">

                <div className="attendance-detail">

                  <p>Total Hours</p>

                  <h4>{record.totalHours}</h4>

                </div>

                <div className="attendance-detail">

                  <p>Clock in & Out</p>

                  <h4>
                    {record.clockIn} — {record.clockOut}
                  </h4>

                </div>

              </div>

            </div>

          ))}

        </section>

      </main>


      {/* BOTTOM NAVIGATION */}

      <nav className="attendance-bottom-nav">

        {/* 1. HOME */}

        <button
          onClick={() => onNavigate?.("dashboard")}
          aria-label="Home"
        >
          <Home size={21} />
        </button>


        {/* 2. CLOCK */}

        <button
          className="active"
          onClick={() => onNavigate?.("clock")}
          aria-label="Clock"
        >
          <Clock3 size={21} />
        </button>


        {/* 3. TASKS */}

        <button
          onClick={() => onNavigate?.("tasks")}
          aria-label="Tasks"
        >
          <ClipboardList size={21} />
        </button>


        {/* 4. EXPENSE */}

        <button
          onClick={() => onNavigate?.("expense")}
          aria-label="Expense"
        >
          <Receipt size={21} />
        </button>


        {/* 5. LEAVE SUMMARY */}

        <button
          onClick={() => onNavigate?.("leaveSummary")}
          aria-label="Leave Summary"
        >
          <Layers size={21} />
        </button>

      </nav>

    </div>

  );

}

export default Attendance;