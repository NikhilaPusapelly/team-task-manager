import { useState } from "react";
import API from "../api/axios";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/signup",
        formData
      );

      alert("Signup Successful");

      console.log(res.data);

    } catch (error) {

      console.log(error);

      alert("Signup Failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
        }}
      >

        <h2>Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <select
          name="role"
          onChange={handleChange}
        >
          <option value="member">
            Member
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button type="submit">
          Signup
        </button>

      </form>

    </div>
  );
}

export default Signup;