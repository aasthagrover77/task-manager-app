import { useEffect, useState } from "react";
import API from "./api";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  // Create Task
  const createTask = async () => {
    if (!title) return alert("Title required");

    await API.post("/tasks", { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  // Select tasks
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // Select All
  const selectAll = () => {
    if (selected.length === tasks.length) {
      setSelected([]);
    } else {
      setSelected(tasks.map((t) => t.id));
    }
  };

  // Bulk Action
  const bulkAction = async (action) => {
    if (selected.length === 0) return;

    await API.post("/tasks/bulk", {
      task_ids: selected,
      action,
    });

    setSelected([]);
    fetchTasks();
  };

  // Update Task
  const updateTask = async (id) => {
    const newTitle = prompt("Enter new title:");
    if (!newTitle) return;

    await API.put(`/tasks/${id}`, {
      title: newTitle,
    });

    fetchTasks();
  };

  // Delete Task
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e4abe4, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "700px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>✨ Task Manager</h1>

        {/* Create Task */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              marginRight: "10px",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #d19fc8",
            }}
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              marginRight: "10px",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #d19fc8",
            }}
          />
          <button
            onClick={createTask}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "none",
              background: "#cc8ec7",
              color: "white",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        {/* Select All */}
        <button
          onClick={selectAll}
          style={{
            marginBottom: "10px",
            padding: "6px 10px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {selected.length === tasks.length ? "Unselect All" : "Select All"}
        </button>

        {/* Bulk Actions */}
        {selected.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <b>{selected.length} selected</b><br />
            <button
              onClick={() => bulkAction("completed")}
              style={{ margin: "5px" }}
            >
              ✅ Complete
            </button>
            <button
              onClick={() => bulkAction("in_progress")}
              style={{ margin: "5px" }}
            >
              ⏳ In Progress
            </button>
            <button
              onClick={() => bulkAction("delete")}
              style={{ margin: "5px" }}
            >
              ❌ Delete
            </button>
          </div>
        )}

        {/* Empty State */}
        {tasks.length === 0 && <p>No tasks yet</p>}

        {/* Task List */}
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #d19fc8",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={selected.includes(task.id)}
                onChange={() => toggleSelect(task.id)}
              />

              <div style={{ marginLeft: "10px" }}>
                <b>{task.title}</b>

                <div style={{ fontSize: "12px", color: "#666" }}>
                  {task.description || "No description"}
                </div>

                <span
                  style={{
                    color:
                      task.status === "completed"
                        ? "green"
                        : task.status === "in_progress"
                        ? "orange"
                        : "gray",
                  }}
                >
                  ({task.status})
                </span>
              </div>
            </div>

            <div>
              <button onClick={() => updateTask(task.id)}>✏️</button>
              <button onClick={() => deleteTask(task.id)}>❌</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;