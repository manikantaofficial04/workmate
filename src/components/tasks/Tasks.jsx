import React, { useState } from "react";
import {
  Home,
  CalendarDays,
  ClipboardList,
  Receipt,
  Layers,
  Zap,
  CalendarCheck,
  MessageCircle,
  Calendar,
  Plus,
  X,
  FileText,
} from "lucide-react";

import "./Tasks.css";

function Tasks({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("In Progress");
  const [showCreateTask, setShowCreateTask] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Wiring Dashboard Analytics",
      status: "In Progress",
      priority: "High",
      progress: 50,
      deadline: "27 April",
      comments: 2,
      avatars: ["👩🏻", "👨🏻", "👩🏼"],
    },
    {
      id: 2,
      title: "API Dashboard Analytics Integration",
      status: "In Progress",
      priority: "High",
      progress: 54,
      deadline: "27 April",
      comments: 2,
      avatars: ["👨🏻", "👩🏼", "👩🏻"],
    },
    {
      id: 3,
      title: "Update Employee Dashboard",
      status: "To Do",
      priority: "Medium",
      progress: 0,
      deadline: "30 April",
      comments: 1,
      avatars: ["👨🏻", "👩🏻"],
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const filteredTasks =
    activeTab === "All"
      ? tasks
      : activeTab === "Finish"
      ? tasks.filter((task) => task.status === "Done")
      : tasks.filter((task) => task.status === "In Progress");

  const handleCreateTask = (e) => {
    e.preventDefault();

    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      status: "To Do",
      priority: "Medium",
      progress: 0,
      deadline: "Not set",
      comments: 0,
      avatars: ["👤"],
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
    setNewTaskTitle("");
    setShowCreateTask(false);
    setActiveTab("All");
  };

  return (
    <div className="tasks-page">

      {/* HEADER */}
      <header className="tasks-header">
        <div className="tasks-header-text">
          <h1>Challenges Awaiting</h1>
          <p>Let's tackle your to do list</p>
        </div>

        <div className="tasks-header-illustration">
          <FileText size={43} strokeWidth={1.2} />
          <span>✦</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="tasks-content">

        {/* WORK SUMMARY */}
        <section className="task-summary-card">
          <h3>Summary of Your Work</h3>
          <p className="summary-subtitle">Your current task progress</p>

          <div className="task-summary-grid">

            <div className="summary-box">
              <p>
                <span className="summary-dot todo-dot"></span>
                To Do
              </p>
              <h2>5</h2>
            </div>

            <div className="summary-box">
              <p>
                <span className="summary-dot progress-dot"></span>
                In Progress
              </p>
              <h2>2</h2>
            </div>

            <div className="summary-box">
              <p>
                <span className="summary-dot done-dot"></span>
                Done
              </p>
              <h2>1</h2>
            </div>

          </div>
        </section>

        {/* BURNOUT STATUS */}
        <section className="burnout-card">

          <div className="burnout-heading">
            <h3>Sprint 20 - Burnout Stats</h3>
            <span className="burnout-status">Poor</span>
          </div>

          <p>
            You've completed <strong>8 more tasks than usual</strong>,
            maintain your task with your supervisor
          </p>

          <div className="burnout-progress-container">
            <div className="burnout-face">☹</div>
            <div className="burnout-progress-track">
              <div className="burnout-progress-fill"></div>
            </div>
          </div>

        </section>

        {/* TASK FILTERS */}
        <div className="task-filter-tabs">

          <button
            className={activeTab === "All" ? "selected" : ""}
            onClick={() => setActiveTab("All")}
          >
            All <span>3</span>
          </button>

          <button
            className={activeTab === "In Progress" ? "selected" : ""}
            onClick={() => setActiveTab("In Progress")}
          >
            In Progress <span>2</span>
          </button>

          <button
            className={activeTab === "Finish" ? "selected" : ""}
            onClick={() => setActiveTab("Finish")}
          >
            Finish <span>2</span>
          </button>

        </div>

        {/* TASK LIST */}
        <section className="task-list">

          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (

              <article className="task-item-card" key={task.id}>

                <div className="task-item-heading">
                  <div className="task-zap-icon">
                    <Zap size={15} fill="white" />
                  </div>

                  <h3>{task.title}</h3>
                </div>

                <div className="task-labels">

                  <span className="task-status-label">
                    <span></span>
                    {task.status}
                  </span>

                  <span className={`task-priority-label ${task.priority.toLowerCase()}`}>
                    ⚑ {task.priority}
                  </span>

                </div>

                <div className="task-progress-track">
                  <div
                    className="task-progress-fill"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>

                <div className="task-item-footer">

                  <div className="task-avatars">
                    {task.avatars.map((avatar, index) => (
                      <span key={index}>{avatar}</span>
                    ))}
                  </div>

                  <div className="task-footer-details">

                    <span>
                      <Calendar size={12} />
                      {task.deadline}
                    </span>

                    <span>
                      <MessageCircle size={12} fill="#cbd2dc" />
                      {task.comments}
                    </span>

                  </div>

                </div>

              </article>

            ))
          ) : (
            <div className="empty-task-state">
              <ClipboardList size={35} />
              <p>No tasks available in this category.</p>
            </div>
          )}

        </section>

      </main>

      {/* CREATE TASK BUTTON */}
      <div className="create-task-container">
        <button
          className="create-task-button"
          onClick={() => setShowCreateTask(true)}
        >
          <Plus size={18} />
          Create Task
        </button>
      </div>

      {/* CREATE TASK MODAL */}
      {showCreateTask && (
        <div className="create-task-overlay">

          <form
            className="create-task-modal"
            onSubmit={handleCreateTask}
          >

            <div className="create-modal-heading">
              <h2>Create New Task</h2>

              <button
                type="button"
                onClick={() => setShowCreateTask(false)}
              >
                <X size={20} />
              </button>
            </div>

            <label>Task Name</label>

            <input
              type="text"
              placeholder="Enter task name"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              required
            />

            <button type="submit" className="save-task-button">
              Create Task
            </button>

          </form>

        </div>
      )}

      {/* BOTTOM NAVIGATION */}
      <nav className="tasks-bottom-nav">

        <button onClick={() => onNavigate?.("dashboard")} aria-label="Home">
          <Home size={21} />
        </button>

        <button onClick={() => onNavigate?.("clock")} aria-label="Clock">
          <CalendarDays size={21} />
        </button>

        <button className="active" aria-label="Tasks">
          <ClipboardList size={21} />
        </button>

        <button onClick={() => onNavigate?.("expense")} aria-label="Expense">
          <Receipt size={21} />
        </button>

        <button onClick={() => onNavigate?.("leaveSummary")} aria-label="Leave Summary">
          <Layers size={21} />
        </button>

      </nav>

    </div>
  );
}

export default Tasks;