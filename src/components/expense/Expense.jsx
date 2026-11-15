import React, { useState } from "react";

import {
  Home,
  CalendarDays,
  ClipboardList,
  Receipt,
  Layers,
  CalendarCheck,
  Calendar,
  CheckCircle2,
  XCircle,
  Plus,
  CreditCard,
} from "lucide-react";

import "./Expense.css";

function Expense({ onNavigate }) {

  // ACTIVE TAB
  const [activeTab, setActiveTab] = useState("Review");

  // EXPENSE DATA
  const expenseData = {

    Review: [
      {
        id: 1,
        date: "27 September 2024",
        type: "E-Learning",
        amount: 55,
      },
      {
        id: 2,
        date: "24 September 2024",
        type: "E-Learning",
        amount: 55,
      },
      {
        id: 3,
        date: "21 September 2024",
        type: "E-Learning",
        amount: 55,
      },
    ],

    Approved: [
      {
        id: 4,
        date: "18 September 2024",
        type: "E-Learning",
        amount: 55,
        approvedDate: "19 Sept 2024",
        approvedBy: "Elaine",
        avatar: "👩🏻",
      },
      {
        id: 5,
        date: "14 September 2024",
        type: "E-Learning",
        amount: 55,
        approvedDate: "19 Sept 2024",
        approvedBy: "Elaine",
        avatar: "👩🏻",
      },
    ],

    Rejected: [
      {
        id: 6,
        date: "27 September 2024",
        type: "Business Trip",
        amount: 100,
        rejectedDate: "28 Sept 2024",
        rejectedBy: "Elaine",
        avatar: "👩🏻",
      },
      {
        id: 7,
        date: "24 September 2024",
        type: "Business Trip",
        amount: 100,
        rejectedDate: "28 Sept 2024",
        rejectedBy: "Elaine",
        avatar: "👩🏻",
      },
    ],

  };


  // TAB COUNTS
  const tabCounts = {
    Review: 3,
    Approved: 2,
    Rejected: 2,
  };


  // GET CURRENT EXPENSES
  const currentExpenses = expenseData[activeTab];


  // SUBMIT EXPENSE BUTTON
  const handleSubmitExpense = () => {
    alert("Submit Expense form will be developed next.");
  };


  return (

    <div className="expense-page">

      {/* =================================
          HEADER
      ================================= */}

      <header className="expense-header">

        <div className="expense-header-text">
          <h1>Expense Summary</h1>
          <p>Claim your expenses here.</p>
        </div>

        <div className="expense-header-illustration">
          <CreditCard size={48} strokeWidth={1.4} />
          <span className="expense-rainbow">🌈</span>
          <span className="expense-sparkle">✦</span>
        </div>

      </header>


      {/* =================================
          MAIN CONTENT
      ================================= */}

      <main className="expense-content">


        {/* =================================
            EXPENSE SUMMARY CARD
        ================================= */}

        <section className="expense-summary-card">

          <h3>Total Expense</h3>

          <p className="expense-period">
            Period 1 Jan 2024 - 30 Dec 2024
          </p>


          <div className="expense-summary-grid">

            {/* TOTAL */}

            <div className="expense-summary-box">

              <p>
                <span className="expense-summary-icon total-icon">
                  <Receipt size={12} />
                </span>
                Total
              </p>

              <h2>$1010</h2>

            </div>


            {/* REVIEW */}

            <div className="expense-summary-box">

              <p>
                <span className="expense-dot review-dot"></span>
                Review
              </p>

              <h2>$455</h2>

            </div>


            {/* APPROVED */}

            <div className="expense-summary-box">

              <p>
                <span className="expense-dot approved-dot"></span>
                Approved
              </p>

              <h2>$555</h2>

            </div>

          </div>

        </section>


        {/* =================================
            EXPENSE TABS
        ================================= */}

        <div className="expense-tabs">

          {["Review", "Approved", "Rejected"].map((tab) => (

            <button
              key={tab}
              className={`expense-tab ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >

              {tab}

              <span className="expense-tab-count">
                {tabCounts[tab]}
              </span>

            </button>

          ))}

        </div>


        {/* =================================
            EXPENSE RECORDS
        ================================= */}

        <section className="expense-record-list">

          {currentExpenses.map((expense) => (

            <article
              className="expense-record-card"
              key={expense.id}
            >

              {/* DATE */}

              <div className="expense-record-date">

                <CalendarDays size={17} />

                <h3>{expense.date}</h3>

              </div>


              {/* EXPENSE DETAILS */}

              <div className="expense-record-details">

                <div>
                  <p>Type</p>
                  <h4>{expense.type}</h4>
                </div>

                <div>
                  <p>Total Expense</p>
                  <h4>${expense.amount}</h4>
                </div>

              </div>


              {/* APPROVED STATUS */}

              {activeTab === "Approved" && (

                <div className="expense-record-status approved-status">

                  <div>
                    <CheckCircle2 size={13} />

                    <span>
                      Approved at {expense.approvedDate}
                    </span>
                  </div>

                  <p>
                    By <span className="expense-avatar">
                      {expense.avatar}
                    </span>
                    {expense.approvedBy}
                  </p>

                </div>

              )}


              {/* REJECTED STATUS */}

              {activeTab === "Rejected" && (

                <div className="expense-record-status rejected-status">

                  <div>
                    <XCircle size={13} />

                    <span>
                      Rejected at {expense.rejectedDate}
                    </span>
                  </div>

                  <p>
                    By <span className="expense-avatar">
                      {expense.avatar}
                    </span>
                    {expense.rejectedBy}
                  </p>

                </div>

              )}

            </article>

          ))}

        </section>

      </main>


      {/* =================================
          SUBMIT EXPENSE BUTTON
      ================================= */}

      <div className="expense-submit-container">

        <button
          className="expense-submit-button"
          onClick={handleSubmitExpense}
        >

          <Plus size={16} />

          Submit Expense

        </button>

      </div>


      {/* =================================
          BOTTOM NAVIGATION
      ================================= */}

      <nav className="expense-bottom-nav">

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
          className="active"
          aria-label="Expense"
        >
          <Receipt size={21} />
        </button>


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

export default Expense;