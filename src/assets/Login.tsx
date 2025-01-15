import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Ensure the path to your CSS file is correct

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState("firm");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      type: selectedRole,
      username,
      password,
    };

    console.log("Login Data Submitted:", loginData);

    // Add any additional logic for handling login here
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
