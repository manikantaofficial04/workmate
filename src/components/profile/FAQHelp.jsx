import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  MessageCircle,
  Mail,
  Phone,
  Headphones,
} from "lucide-react";

import "./FAQHelp.css";

function FAQHelp({ onBack }) {

  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I update my profile?",
      answer:
        "Open My Profile and select My Work Profile to view your employee information. Contact your administrator if you need to update your official details.",
    },
    {
      question: "How can I change my password?",
      answer:
        "Go to My Profile, select Change Password, enter your current password and new password, and submit the form.",
    },
    {
      question: "How do I check my attendance?",
      answer:
        "Open the Attendance section from the dashboard to view your clock-in, clock-out and working hours.",
    },
    {
      question: "Where can I view my tasks?",
      answer:
        "Open the Tasks section from the dashboard to view your assigned tasks and their current status.",
    },
    {
      question: "How can I apply for leave?",
      answer:
        "Open the Leave Summary section to view your leave information and available leave options.",
    },
    {
      question: "Where can I check my salary details?",
      answer:
        "Open My Profile and select Payroll & Tax to view the available payroll information.",
    },
    {
      question: "How can I report a problem?",
      answer:
        "Contact your company administrator or support team and provide a description of the issue.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <main className="faq-help-page">

      {/* HEADER */}

      <header className="faq-help-header">

        <button
          className="faq-help-back"
          onClick={onBack}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <h1>FAQ and Help</h1>

      </header>

      {/* CONTENT */}

      <section className="faq-help-content">

        {/* INTRO CARD */}

        <div className="faq-help-intro">

          <div className="faq-help-icon">
            <CircleHelp size={36} />
          </div>

          <h2>How Can We Help You?</h2>

          <p>
            Find answers to common questions about using
            your Workmate application.
          </p>

        </div>

        {/* FAQ SECTION */}

        <section className="faq-help-section">

          <h3>FREQUENTLY ASKED QUESTIONS</h3>

          <div className="faq-help-list">

            {faqs.map((faq, index) => (

              <div
                className={`faq-help-item ${
                  activeFAQ === index ? "active" : ""
                }`}
                key={index}
              >

                <button
                  className="faq-help-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeFAQ === index}
                >

                  <span>{faq.question}</span>

                  {activeFAQ === index ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}

                </button>

                {activeFAQ === index && (

                  <div className="faq-help-answer">
                    <p>{faq.answer}</p>
                  </div>

                )}

              </div>

            ))}

          </div>

        </section>

        {/* CONTACT SUPPORT */}

        <section className="faq-help-section">

          <h3>CONTACT SUPPORT</h3>

          <div className="faq-support-card">

            <div className="faq-support-heading">

              <div className="faq-support-icon">
                <Headphones size={24} />
              </div>

              <div>
                <h4>Need More Help?</h4>
                <p>Our support team can assist you.</p>
              </div>

            </div>

            <div className="faq-support-option">

              <Mail size={18} />

              <div>
                <span>Email Support</span>
                <p>Contact your company administrator</p>
              </div>

            </div>

            <div className="faq-support-option">

              <MessageCircle size={18} />

              <div>
                <span>Help and Queries</span>
                <p>Reach out to your HR department</p>
              </div>

            </div>

            <div className="faq-support-option">

              <Phone size={18} />

              <div>
                <span>Phone Support</span>
                <p>Contact your company's support team</p>
              </div>

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}

export default FAQHelp;