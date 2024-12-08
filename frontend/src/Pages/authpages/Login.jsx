import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/authpages/Login.css"; // Ensure this path matches where you place your Login.css
import axios from "axios";
import "../../Styles/responsive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility toggle
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    axios
      .post("http://localhost:5000/api/auth/login", { email, password })
      .then((result) => {
        if (result.data.message === "Login successful") {
          localStorage.setItem("token", result.data.token);
          if (result.data.member.role === "vendor") {
            navigate("/vendorlandingpage"); // Redirect to vendor landing page
          } // else if (result.data.member.role === "customer") {
          //  navigate("/vendorlandingpage"); // Redirect to vendor landing page
          //} else {
          //  navigate("/vendorlandingpage"); // Redirect to vendor landing page
          //}
        } else {
          alert(result.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img
          src="https://www.realproperty.pk/assets/4eda390c/rp-whit-n-green-logo.png"
          alt="RealProperty Logo"
        />
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="error-message">{error}</p>}
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="full-width"
          required
        />
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"} // Toggle visibility for password
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="full-width"
            required
          />
          <span
            className="toggle-password-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
        <button type="submit">Login</button>
        <p className="signup-prompt">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
          <br />
          <br />
          <Link to="/forgotpassword" className="signup-link">
            Forget Password?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;