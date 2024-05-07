import React, { useState, useContext } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContext";
import sideImage from "../../Assets/Element.png";
import google from "../../Assets/g.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserContext); // Destructure setUser from context
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/Register");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if email and password are provided
    if (!email || !password) {
      setErrorMessage("Please provide both email and password.");
      return;
    }

    try {
      const response = await fetch(`${window.location.origin}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const userData = await response.json();
      setUser(userData);
      console.log("Login successful!");
      console.log({ userData });

      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/Home");
    } catch (error) {
      // Handle errors
      console.log("Error:", error); // Log the error object

      setErrorMessage(error.toString());
    }
  };

  return (
    <>
      <div className="login-page">
        <img src={sideImage} alt="" />
        <form action="">
          <div className="login-container ">
            <h2>Welcome Back, Dude</h2>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button>
              <img src={google} alt="" />
              Login with Google
            </button>
            <hr />
            <p> or login with email </p>
            <div className="form-group">
              <label>Email Address:</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter Email Address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:
              <i
                  className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}
                  onClick={togglePasswordVisibility}
                  style={{
                    fontSize: "2rem",
                    cursor: "pointer",
                  }}
                ></i>
              </label>

              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="checkbox">
              <input type="checkbox" name="Remember me" id="" />
              Remember Me
            </div>

            <div className="Submit">
              <button type="submit" onClick={handleSubmit}>
                Login
              </button>
            </div>
            <div className="Register">
              <p>
                Don't have an account? <span onClick={handleRegister}>Sign Up</span>
                </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
