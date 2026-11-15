import React from "react";

import {
  MessageCircle,
  Bell,
  Home as HomeIcon,
  CalendarDays,
  ClipboardList,
  Receipt,
  Layers,
  Video,
  Clock3,
  CheckSquare,
  CalendarCheck,
  MessageSquare,
} from "lucide-react";

import "./Home.css";

function Home({ user, onNavigate }) {

  const employeeName = user?.fullName || "5856";

  const employeeRole =
    user?.role || "Junior Full Stack Developer";


  // =====================================
  // TODAY MEETINGS
  // =====================================

  const meetings = [
    {
      id: 1,
      title: "Townhall Meeting",
      time: "01:30 AM - 02:00 AM",
      participants: ["T", "A", "M"],
      extra: "+3",
    },
    {
      id: 2,
      title: "Dashboard Report",
      time: "01:30 AM - 02:00 AM",
      participants: ["P", "R", "S"],
      extra: "",
    },
  ];


  // =====================================
  // TODAY TASKS
  // =====================================

  const tasks = [
    {
      id: 1,
      title: "Wiring Dashboard Analytics",
      status: "In Progress",
      priority: "High",
      progress: 86,
      deadline: "27 April",
      comments: 2,
      team: ["T", "A", "M"],
    },
  ];


  return (

    <div className="home-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="home-header">

        <div className="home-user-info">

          <div className="home-avatar">
            {employeeName.charAt(0).toUpperCase()}
          </div>

          <div className="home-user-details">

            <div className="home-name-row">

              <h3>{employeeName}</h3>

              <span className="verified-badge">
                ✓
              </span>

            </div>

            <p>{employeeRole}</p>

          </div>

        </div>


        {/* HEADER ACTIONS */}

        <div className="home-header-actions">

          {/* MESSAGES */}

          <button
            type="button"
            onClick={() => onNavigate?.("messages")}
            aria-label="Messages"
            title="Messages"
          >
            <MessageCircle size={21} />
          </button>


          {/* NOTIFICATIONS */}

          <button
            type="button"
            onClick={() => alert("No new notifications")}
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={21} />
          </button>

        </div>

      </header>


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="home-content">


        {/* =====================================
            WORK SUMMARY
        ===================================== */}

        <section className="work-summary-banner">

          <div>

            <h2>My Work Summary</h2>

            <p>Track your work progress</p>

          </div>

          <div className="summary-decoration">

            <CalendarCheck size={38} />

            <span className="summary-star">
              ✦
            </span>

          </div>

        </section>


        {/* =====================================
            TODAY MEETING
        ===================================== */}

        <section className="home-card">

          <div className="home-card-heading">

            <div className="heading-title">

              <h3>Today Meeting</h3>

              <span className="count-badge">
                {meetings.length}
              </span>

            </div>

          </div>


          <div className="meeting-list">

            {meetings.map((meeting) => (

              <article
                className="meeting-item"
                key={meeting.id}
              >

                <div className="meeting-top-row">

                  <div className="meeting-title">

                    <span className="meeting-icon">
                      <Video size={12} />
                    </span>

                    <span>
                      {meeting.title}
                    </span>

                  </div>

                  <div className="meeting-time">

                    <Clock3 size={12} />

                    <span>
                      {meeting.time}
                    </span>

                  </div>

                </div>


                <div className="meeting-bottom-row">

                  <div className="meeting-participants">

                    {meeting.participants.map((person, index) => (

                      <span
                        key={index}
                        className={`participant-avatar participant-${index + 1}`}
                      >
                        {person}
                      </span>

                    ))}

                    {meeting.extra && (

                      <span className="extra-participants">
                        {meeting.extra}
                      </span>

                    )}

                  </div>


                  <button
                    type="button"
                    className="join-meeting-button"
                    onClick={() => alert("Meeting link will be added later.")}
                  >
                    Join Meet
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* =====================================
            TODAY TASK
        ===================================== */}

        <section className="home-card">

          <div className="home-card-heading">

            <div className="heading-title">

              <h3>Today Task</h3>

              <span className="count-badge">
                {tasks.length}
              </span>

            </div>

          </div>


          <div className="task-list">

            {tasks.map((task) => (

              <article
                className="task-item"
                key={task.id}
              >

                {/* TASK TITLE */}

                <div className="task-title-row">

                  <span className="task-icon">
                    <ClipboardList size={13} />
                  </span>

                  <h4>{task.title}</h4>

                </div>


                {/* TASK STATUS */}

                <div className="task-status-row">

                  <span className="task-status">

                    <span className="status-dot"></span>

                    {task.status}

                  </span>


                  <span className="task-priority">

                    <span className="priority-dot"></span>

                    {task.priority}

                  </span>

                </div>


                {/* TASK PROGRESS */}

                <div className="task-progress">

                  <div
                    className="task-progress-fill"
                    style={{
                      width: `${task.progress}%`,
                    }}
                  />

                </div>


                {/* TASK FOOTER */}

                <div className="task-bottom-row">


                  {/* TEAM */}

                  <div className="task-team">

                    {task.team.map((person, index) => (

                      <span
                        key={index}
                        className={`participant-avatar participant-${index + 1}`}
                      >
                        {person}
                      </span>

                    ))}

                  </div>


                  {/* TASK META */}

                  <div className="task-meta">

                    <span>

                      <CalendarDays size={12} />

                      {task.deadline}

                    </span>

                    <span>

                      <MessageSquare size={12} />

                      {task.comments}

                    </span>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </section>

      </main>


      {/* =====================================
          BOTTOM NAVIGATION
      ===================================== */}

      <nav className="home-bottom-nav">

        {/* HOME */}

        <button
          className="active"
          onClick={() => onNavigate?.("dashboard")}
          aria-label="Home"
        >
          <HomeIcon size={21} />
        </button>


        {/* CLOCK */}

        <button
          onClick={() => onNavigate?.("clock")}
          aria-label="Clock"
        >
          <CalendarDays size={21} />
        </button>


        {/* TASKS */}

        <button
          onClick={() => onNavigate?.("tasks")}
          aria-label="Tasks"
        >
          <ClipboardList size={21} />
        </button>


        {/* EXPENSE */}

        <button
          onClick={() => onNavigate?.("expense")}
          aria-label="Expense"
        >
          <Receipt size={21} />
        </button>


        {/* LEAVE SUMMARY */}

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

export default Home;