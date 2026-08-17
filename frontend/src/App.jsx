import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "TODO",
  });

  const [error, setError] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      setTasks(data);
      setError("");
    } catch (err) {
      setError("Unable to load tasks. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  // Load tasks when page opens
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle form input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // Create task
  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!form.title.trim()) {
    setError("Task title is required.");
    return;
  }

  try {
    const method = editingTaskId ? "PUT" : "POST";

    const url = editingTaskId
      ? `${API_URL}/${editingTaskId}`
      : API_URL;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Failed to save task");
    }

    setForm({
      title: "",
      description: "",
      priority: "MEDIUM",
      status: "TODO",
    });

    setEditingTaskId(null);
    setError("");

    await fetchTasks();
  } catch (err) {
    setError("Unable to save task.");
  }
};

//Edit Task
const handleEdit = (task) => {
  setEditingTaskId(task._id);

  setForm({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
  });

  setError("");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

//Cancel Edit Task
const handleCancelEdit = () => {
  setEditingTaskId(null);

  setForm({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "TODO",
  });

  setError("");
};

  // Delete task
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      fetchTasks();
    } catch (err) {
      setError("Unable to delete task.");
    }
  };

const filteredTasks = tasks.filter((task) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    task.title.toLowerCase().includes(search) ||
    task.description.toLowerCase().includes(search);

  const matchesStatus =
    statusFilter === "ALL" ||
    task.status === statusFilter;

  const matchesPriority =
    priorityFilter === "ALL" ||
    task.priority === priorityFilter;

  return matchesSearch && matchesStatus && matchesPriority;
});

const totalTasks = tasks.length;

const todoTasks = tasks.filter(
  (task) => task.status === "TODO"
).length;

const inProgressTasks = tasks.filter(
  (task) => task.status === "IN_PROGRESS"
).length;

const completedTasks = tasks.filter(
  (task) => task.status === "DONE"
).length;

const highPriorityTasks = tasks.filter(
  (task) => task.priority === "HIGH"
).length;

const completionRate =
  totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>TaskFlow</h1>
          <p>Manage your work. Stay organized.</p>
        </div>
      </header>

      <main className="container">
        <div className="dashboard">

  <div className="dashboard-header">
    <div>
      <h1>TaskFlow Dashboard</h1>
    </div>
  </div>

  <div className="stats-grid">

    <div className="stat-card">
      <span className="stat-label">Total Tasks</span>
      <strong>{totalTasks}</strong>
    </div>

    <div className="stat-card">
      <span className="stat-label">To Do</span>
      <strong>{todoTasks}</strong>
    </div>

    <div className="stat-card">
      <span className="stat-label">In Progress</span>
      <strong>{inProgressTasks}</strong>
    </div>

    <div className="stat-card">
      <span className="stat-label">Completed</span>
      <strong>{completedTasks}</strong>
    </div>

    <div className="stat-card">
      <span className="stat-label">High Priority</span>
      <strong>{highPriorityTasks}</strong>
    </div>

    <div className="progress-card">

  <div className="progress-header">
    <span>Overall Progress</span>
    <strong>{completionRate}%</strong>
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${completionRate}%` }}
    ></div>
  </div>

</div>

  </div>

</div>


        {/* Create Task */}
        <section className="card">
          <h2>{editingTaskId ? "Edit Task" : "Create a Task"}</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Task Title</label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Build React dashboard"
              />
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the task..."
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Priority</label>

                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
              </div>

            </div>

            <button type="submit" className="primary-btn">
  {editingTaskId ? "Save Changes" : "+ Add Task"}
</button>

{editingTaskId && (
  <button
    type="button"
    className="cancel-btn"
    onClick={handleCancelEdit}
  >
    Cancel
  </button>
)}

          </form>
        </section>

        {/* Error */}
        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {/* Task List */}
        <section className="card">

          <div className="section-header">
            <h2>Your Tasks</h2>

            <div className="filters">

  <input
    type="text"
    placeholder="🔍 Search tasks..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(event) => setStatusFilter(event.target.value)}
  >
    <option value="ALL">All Statuses</option>
    <option value="TODO">To Do</option>
    <option value="IN_PROGRESS">In Progress</option>
    <option value="DONE">Done</option>
  </select>

  <select
    value={priorityFilter}
    onChange={(event) => setPriorityFilter(event.target.value)}
  >
    <option value="ALL">All Priorities</option>
    <option value="LOW">Low</option>
    <option value="MEDIUM">Medium</option>
    <option value="HIGH">High</option>
  </select>

</div>

            <button
              className="refresh-btn"
              onClick={fetchTasks}
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="empty">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="empty">
              No tasks yet. Create your first task!
            </p>
            ) : filteredTasks.length === 0 ? (
              <p className="empty">
              No tasks match your search or filters.
            </p>
          ) : (
            <div className="task-list">

              {filteredTasks.map((task) => (
                <div className="task" key={task._id}>

                  <div className="task-info">

                    <h3>{task.title}</h3>

                    <p>
                      {task.description || "No description"}
                    </p>

                    <div className="badges">

                      <span className={`status ${task.status}`}>
                        {task.status.replace("_", " ")}
                      </span>

                      <span className={`priority ${task.priority}`}>
                        {task.priority}
                      </span>

                    </div>

                  </div>

                  <div className="task-actions">

  <button
    className="edit-btn"
    onClick={() => handleEdit(task)}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(task._id)}
  >
    Delete
  </button>

</div>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default App;