import { useState, useEffect } from "react";
import API from "../api/axios";

function CreateTask() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch Projects & Users
  useEffect(() => {

    const fetchData = async () => {

      try {

        // Fetch Projects
        const projectRes = await API.get(
          "/projects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProjects(projectRes.data);

        // Fetch Users
        const userRes = await API.get(
          "/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(userRes.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);

  // Create Task
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/tasks",
        {
          title,
          description,
          project,
          assignedTo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Created Successfully");

      window.location.href = "/dashboard";

    } catch (error) {
      console.log(error);

      alert("Failed to create task");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f1f5f9",
        minHeight: "100vh",
      }}
    >

      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Create Task
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Task Title */}
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          {/* Task Description */}
          <textarea
            placeholder="Task Description"
            
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows="4"
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
<input
  type="date"
  value={dueDate}
  onChange={(e) =>
    setDueDate(e.target.value)
  }
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  }}
/>
          {/* Select Project */}
          <select
            value={project}
            onChange={(e) =>
              setProject(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >

            <option value="">
              Select Project
            </option>

            {projects.map((proj) => (
              <option
                key={proj._id}
                value={proj._id}
              >
                {proj.name}
              </option>
            ))}

          </select>

          {/* Assign User */}
          <select
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >

            <option value="">
              Assign User
            </option>

            {users.map((user) => (
              <option
                key={user._id}
                value={user._id}
              >
                {user.name} ({user.role})
              </option>
            ))}

          </select>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Create Task
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateTask;