import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Ensure the path to your CSS file is correct

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = { username, password };

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token); // Store JWT token
        navigate("/"); // Redirect to the home page (or dashboard)
      } else {
        console.error("Login failed:", data.message);
        alert(data.message); // Show an error message to the user
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        background: "radial-gradient(circle at bottom right, #73b2c9, #00a33e)",
      }}
    >
      <div className="login-container">
        <div className="verdi-title">
          OrarioPerfetto
          <h2 className="login-title">Log In</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
