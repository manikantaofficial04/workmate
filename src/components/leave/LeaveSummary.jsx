import React, { useState } from "react";

import {
  Home,
  CalendarDays,
  ClipboardList,
  Receipt,
  Layers,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Plus,
  FileText,
  Star,
} from "lucide-react";

import "./LeaveSummary.css";

function LeaveSummary({ onNavigate }) {

  const [activeTab, setActiveTab] = useState("Review");

  // DEMO LEAVE DATA
  const leaveData = {

    Review: [
      {
        id: 1,
        date: "10 November 2024",
        leaveDate: "11 Nov - 13 Nov",
        totalDays: "2 Days",
      },
    ],

    Approved: [
      {
        id: 2,
        date: "18 September 2024",
        leaveDate: "20 Sept - 22 Sept",
        totalDays: "2 Days",
        statusDate: "19 Sept 2024",
        approvedBy: "Elaine",
        avatar: "👩🏻",
      },
    ],

    Rejected: [
      {
        id: 3,
        date: "21 September 2024",
        leaveDate: "10 Nov - 17 Nov",
        totalDays: "7 Days",
        statusDate: "22 Sept 2024",
        rejectedBy: "Elaine",
        avatar: "👩🏻",
      },
    ],

  };

  const tabCounts = {
    Review: 1,
    Approved: 1,
    Rejected: 1,
  };

  const currentLeaves = leaveData[activeTab];

  const handleSubmitLeave = () => {
    alert("Submit Leave form will be developed next.");
  };


  return (

    <div className="leave-page">

      {/* HEADER */}

      <header className="leave-header">

        <div className="leave-header-text">
          <h1>Leave Summary</h1>
          <p>Submit Leave</p>
        </div>

        <div className="leave-header-illustration">
          <FileText size={48} strokeWidth={1.3} />
          <span className="leave-rainbow">🌈</span>
          <span className="leave-sparkle">✦</span>
        </div>

      </header>


      {/* MAIN CONTENT */}

      <main className="leave-content">

        {/* LEAVE SUMMARY CARD */}

        <section className="leave-summary-card">

          <h3>Total Leave</h3>

          <p className="leave-period">
            Period 1 Jan 2024 - 30 Dec 2024
          </p>

          <div className="leave-summary-grid">

            <div className="leave-summary-box">

              <p>
                <span className="leave-dot available-dot"></span>
                Available
              </p>

              <h2>20</h2>

            </div>

            <div className="leave-summary-box">

              <p>
                <span className="leave-dot used-dot"></span>
                Leave Used
              </p>

              <h2>2</h2>

            </div>

          </div>

        </section>


        {/* TABS */}

        <div className="leave-tabs">

          {["Review", "Approved", "Rejected"].map((tab) => (

            <button
              key={tab}
              className={`leave-tab ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >

              {tab}

              {activeTab === tab && (
                <span className="leave-tab-count">
                  {tabCounts[tab]}
                </span>
              )}

            </button>

          ))}

        </div>


        {/* LEAVE RECORDS */}

        <section className="leave-record-list">

          {currentLeaves.map((leave) => (

            <article className="leave-record-card" key={leave.id}>

              <div className="leave-record-date">

                <CalendarCheck size={17} />

                <h3>{leave.date}</h3>

              </div>


              <div className="leave-record-details">

                <div>
                  <p>Leave Date</p>
                  <h4>{leave.leaveDate}</h4>
                </div>

                <div>
                  <p>Total Leave</p>
                  <h4>{leave.totalDays}</h4>
                </div>

              </div>


              {/* APPROVED STATUS */}

              {activeTab === "Approved" && (

                <div className="leave-record-status approved-status">

                  <div>
                    <CheckCircle2 size={13} />
                    <span>
                      Approved at {leave.statusDate}
                    </span>
                  </div>

                  <p>
                    By
                    <span className="leave-avatar">
                      {leave.avatar}
                    </span>
                    {leave.approvedBy}
                  </p>

                </div>

              )}


              {/* REJECTED STATUS */}

              {activeTab === "Rejected" && (

                <div className="leave-record-status rejected-status">

                  <div>
                    <XCircle size={13} />
                    <span>
                      Rejected at {leave.statusDate}
                    </span>
                  </div>

                  <p>
                    By
                    <span className="leave-avatar">
                      {leave.avatar}
                    </span>
                    {leave.rejectedBy}
                  </p>

                </div>

              )}

            </article>

          ))}

        </section>

      </main>


      {/* SUBMIT LEAVE BUTTON */}

      <div className="leave-submit-container">

        <button
          className="leave-submit-button"
          onClick={handleSubmitLeave}
        >
          <Plus size={16} />
          Submit Leave
        </button>

      </div>


      {/* BOTTOM NAVIGATION */}

      <nav className="leave-bottom-nav">

        <button
          onClick={() => onNavigate?.("dashboard")}
          aria-label="Home"
        >
          <Home size={21} />
        </button>

        <button
          onClick={() => onNavigate?.("clock")}
          aria-label="Clock"
        >
          <CalendarDays size={21} />
        </button>

        <button
          onClick={() => onNavigate?.("tasks")}
          aria-label="Tasks"
        >
          <ClipboardList size={21} />
        </button>

        <button
          onClick={() => onNavigate?.("expense")}
          aria-label="Expense"
        >
          <Receipt size={21} />
        </button>

        <button
          className="active"
          aria-label="Leave Summary"
        >
          <Layers size={21} />
        </button>

      </nav>

    </div>

  );

}

export default LeaveSummary;