import React from "react";
import { ArrowLeft, Clock3, CalendarDays } from "lucide-react";
import "./PayrollTax.css";

function PayrollTax({ user, onBack }) {
  const payroll = {
    period: "1 Sept 2024 - 30 Sept 2024",
    overtimeHours: "00:00 Hrs",
    payPeriodHours: "40:00 Hrs",
    basicSalary: 700,
    tax: -70,
    reimbursement: 70,
    bonus: 100,
    overtime: 0,
    totalSalary: 800,
  };

  const handleSavePDF = () => {
    window.print();
  };

  return (
    <main className="payroll-page">

      {/* HEADER */}
      <header className="payroll-header">
        <button
          className="payroll-back"
          onClick={onBack}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <h1>Payroll and Tax</h1>
      </header>

      {/* PAYROLL CONTENT */}
      <section className="payroll-content">

        {/* WORKING HOURS */}
        <div className="payroll-hours-card">

          <h3>Total Working Hour</h3>

          <p className="payroll-period">
            Paid Period {payroll.period}
          </p>

          <div className="payroll-hours-grid">

            <div className="payroll-hours-item">
              <div className="payroll-hours-label">
                <Clock3 size={13} />
                <span>Overtime</span>
              </div>

              <h2>{payroll.overtimeHours}</h2>
            </div>

            <div className="payroll-hours-item">
              <div className="payroll-hours-label">
                <CalendarDays size={13} />
                <span>This Pay Period</span>
              </div>

              <h2>{payroll.payPeriodHours}</h2>
            </div>

          </div>
        </div>

        {/* PAYROLL DETAILS */}
        <div className="payroll-details-card">

          <h3>Payroll Details</h3>

          <p className="payroll-details-subtitle">
            Details about payroll
          </p>

          <div className="payroll-divider"></div>

          <div className="payroll-row">
            <span>Basic Salary</span>
            <strong>$700.00</strong>
          </div>

          <div className="payroll-row">
            <span>Tax</span>
            <strong className="payroll-negative">
              $70.00-
            </strong>
          </div>

          <div className="payroll-row">
            <span>Reimbursement</span>
            <strong className="payroll-positive">
              $70.00+
            </strong>
          </div>

          <div className="payroll-row">
            <span>Bonus</span>
            <strong className="payroll-positive">
              $100.00+
            </strong>
          </div>

          <div className="payroll-row">
            <span>Overtime</span>
            <strong>$0.00</strong>
          </div>

          <div className="payroll-divider"></div>

          <div className="payroll-total-row">
            <strong>Total Salary</strong>
            <strong>$800.00</strong>
          </div>

        </div>

      </section>

      {/* BOTTOM BUTTON */}
      <div className="payroll-bottom">
        <button
          className="payroll-pdf-button"
          onClick={handleSavePDF}
        >
          Save As PDF
        </button>
      </div>

    </main>
  );
}

export default PayrollTax;