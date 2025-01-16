import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

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

      console.log("Login response:", data); // Debugging

      if (response.ok) {
        console.log("Login successful:", data);
        if (data.token) {
          localStorage.setItem("authToken", data.token); // Store JWT token
          navigate("/home"); // Redirect to the home page (or dashboard)
        } else {
          console.error("No token provided in response");
          alert("Login succeeded but no token was returned.");
        }
      } else {
        console.error("Login failed:", data.message);
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert(
        "An error occurred while trying to log in. Please try again later."
      );
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
