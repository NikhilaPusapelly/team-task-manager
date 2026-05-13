import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Fetch Data
  const fetchData = async () => {

    try {

      const projectRes = await API.get(
        "/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const taskRes = await API.get(
        "/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(projectRes.data);
      setTasks(taskRes.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchData();

  }, []);

  // Update Task Status
  const updateTaskStatus = async (
    taskId,
    status
  ) => {

    try {

      await API.put(
        `/tasks/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchData();

    } catch (error) {

      console.log(error);
    }
  };

  // Delete Task
  const deleteTask = async (taskId) => {

    try {

      await API.delete(
        `/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchData();

    } catch (error) {

      console.log(error);
    }
  };

  // Delete Project
  const deleteProject = async (
    projectId
  ) => {

    try {

      await API.delete(
        `/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchData();

    } catch (error) {

      console.log(error);
    }
  };

  // Logout
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "/";
  };

  // Dashboard Stats
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) =>
      task.status === "in-progress"
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate) <
        new Date() &&
      task.status !== "done"
  ).length;

  return (
   <div
  style={{
    padding: "40px",
    backgroundColor: "#f1f5f9",
    minHeight: "100vh",
    minHeight: "100vh",
  }}
>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >

        <h1
          style={{
            fontSize: "52px",
            color: "#0f172a",
          }}
        >
          Team Task Manager
        </h1>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>

      </div>

      {/* Admin Buttons */}
      {role === "admin" && (
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "30px",
          }}
        >

          <button
            onClick={() =>
              window.location.href =
                "/create-project"
            }
            style={{
              backgroundColor:
                "#2563eb",
              color: "white",
              border: "none",
              padding: "14px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            + Create Project
          </button>

          <button
            onClick={() =>
              window.location.href =
                "/create-task"
            }
            style={{
              backgroundColor:
                "#10b981",
              color: "white",
              border: "none",
              padding: "14px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            + Create Task
          </button>

        </div>
      )}

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >

        {/* Total */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Total Tasks</h3>

          <h1
            style={{
              fontSize: "42px",
              marginTop: "10px",
              color: "#2563eb",
            }}
          >
            {totalTasks}
          </h1>
        </div>

        {/* Completed */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Completed</h3>

          <h1
            style={{
              fontSize: "42px",
              marginTop: "10px",
              color: "#22c55e",
            }}
          >
            {completedTasks}
          </h1>
        </div>

        {/* Progress */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>In Progress</h3>

          <h1
            style={{
              fontSize: "42px",
              marginTop: "10px",
              color: "#f59e0b",
            }}
          >
            {inProgressTasks}
          </h1>
        </div>

        {/* Overdue */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Overdue</h3>

          <h1
            style={{
              fontSize: "42px",
              marginTop: "10px",
              color: "#ef4444",
            }}
          >
            {overdueTasks}
          </h1>
        </div>

      </div>

      {/* Projects */}
      {projects.map((project) => {

        const projectTasks =
          tasks.filter(
            (task) =>
              task.project &&
              task.project._id ===
                project._id
          );

        return (
          <div
            key={project._id}
           style={{
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "20px",
  marginBottom: "30px",
  boxShadow:
    "0 4px 15px rgba(0,0,0,0.08)",
}}
          >

            <h2
              style={{
                fontSize: "34px",
                marginBottom: "10px",
                color: "#0f172a",
              }}
            >
              {project.name}
            </h2>

            <p
              style={{
                fontSize: "19px",
                color: "#475569",
              }}
            >
              {project.description}
            </p>

            <br />

            {/* Delete Project */}
            {role === "admin" && (
              <button
                onClick={() =>
                  deleteProject(
                    project._id
                  )
                }
                style={{
                  backgroundColor:
                    "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Delete Project
              </button>
            )}

            <h3
              style={{
                marginTop: "25px",
              }}
            >
              Tasks (
              {projectTasks.length})
            </h3>

            {projectTasks.length ===
            0 ? (
              <p
                style={{
                  color: "#64748b",
                  fontStyle: "italic",
                  marginTop: "10px",
                }}
              >
                No tasks available for
                this project
              </p>
            ) : (
              projectTasks.map(
                (task) => (
                  <div
                    key={task._id}
                    style={{
  border:
    "1px solid #e2e8f0",
  padding: "20px",
  borderRadius:
    "14px",
  marginTop: "18px",
  backgroundColor:
    "#f8fafc",
}}
                  >

                    <h4
                      style={{
                        fontSize: "22px",
                        marginBottom:
                          "8px",
                        color: "#0f172a",
                      }}
                    >
                      {task.title}
                    </h4>

                    <p
                      style={{
                        fontSize: "16px",
                        color: "#475569",
                        marginBottom:
                          "10px",
                      }}
                    >
                      {
                        task.description
                      }
                    </p>

                    {/* Due Date */}
                    <p>
                      Due:{" "}
                      {task?.dueDate
                        ? new Date(
                            task.dueDate
                          ).toLocaleDateString()
                        : "No Due Date"}
                    </p>

                    {/* Overdue */}
                    {task?.dueDate &&
                      !isNaN(
                        new Date(
                          task.dueDate
                        )
                      ) &&
                      new Date(
                        task.dueDate
                      ) <
                        new Date() &&
                      task.status !==
                        "done" && (
                        <p
                          style={{
                            color:
                              "red",
                            fontWeight:
                              "bold",
                            marginTop:
                              "5px",
                          }}
                        >
                          Overdue
                        </p>
                      )}

                    {/* Assigned */}
                    <p>
                      Assigned To:{" "}
                      <strong>
                        {task
                          .assignedTo
                          ?.name ||
                          "Unassigned"}
                      </strong>
                    </p>

                    {/* Status Badge */}
                    <p
                      style={{
                        display:
                          "inline-block",
                        backgroundColor:
                          task.status ===
                          "done"
                            ? "#22c55e"
                            : task.status ===
                              "in-progress"
                            ? "#f59e0b"
                            : "#ef4444",
                        color: "white",
                        padding:
                          "6px 12px",
                        borderRadius:
                          "20px",
                        fontSize:
                          "14px",
                        fontWeight:
                          "bold",
                      }}
                    >
                      {task.status}
                    </p>

                    <br />
                    <br />

                    {/* Status Dropdown */}
                    <select
                      value={
                        task.status
                      }
                      onChange={(e) =>
                        updateTaskStatus(
                          task._id,
                          e.target
                            .value
                        )
                      }
                      style={{
                        padding:
                          "10px",
                        borderRadius:
                          "8px",
                        border:
                          "1px solid #ccc",
                      }}
                    >

                      <option value="todo">
                        Todo
                      </option>

                      <option value="in-progress">
                        In Progress
                      </option>

                      <option value="done">
                        Done
                      </option>

                    </select>

                    <br />
                    <br />

                    {/* Delete Task */}
                    {role ===
                      "admin" && (
                      <button
                        onClick={() =>
                          deleteTask(
                            task._id
                          )
                        }
                        style={{
                          backgroundColor:
                            "#dc2626",
                          color:
                            "white",
                          border:
                            "none",
                          padding:
                            "10px 16px",
                          borderRadius:
                            "10px",
                          cursor:
                            "pointer",
                          fontWeight:
                            "bold",
                        }}
                      >
                        Delete Task
                      </button>
                    )}

                  </div>
                )
              )
            )}

          </div>
        );
      })}

    </div>
  );
}

export default Dashboard;