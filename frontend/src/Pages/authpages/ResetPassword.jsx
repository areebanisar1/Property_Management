import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../Styles/authpages/ForgotPassword.css"; // Ensure this path matches where you place your ForgotPassword.css
import axios from "axios";
import "../../Styles/responsive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
  const location = useLocation();
  const { email } = location.state || {};
  console.log(email);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert("Passwords do not match.");
      return;
    }
    axios
      .post("http://localhost:5000/api/auth/reset-password", {
        email,
        password,
      })
      .then((result) => {
        alert("Password changed Successfully");
        navigate("/login");
      })
      .catch((err) => alert("An error occurred. Please try again."));
  };

  return (
    <div className="forgot-password-container">
      <div className="logo">
        <img
          src="https://www.realproperty.pk/assets/4eda390c/rp-whit-n-green-logo.png"
          alt="RealProperty Logo"
        />
      </div>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h2>Reset Password</h2>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="New Password"
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
        <div className="password-input-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="password"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
            className="full-width"
            required
          />
          <span
            className="toggle-password-icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
          </span>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResetPassword;
