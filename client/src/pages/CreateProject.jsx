import { useState } from "react";
import API from "../api/axios";

function CreateProject() {

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/projects",
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      alert("Project Created Successfully");

    } catch (error) {

      console.log(error);

      alert("Failed to create project");
    }
  };

  return (
    <div>

      <h2>Create Project</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Project Title"
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Project Description"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Create Project
        </button>

      </form>

    </div>
  );
}

export default CreateProject;