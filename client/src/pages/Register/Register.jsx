import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import sideImage from "../../Assets/Element.png";
import google from "../../Assets/g.png";
import {  ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BASE_URL} from "../../apiConfig"
const Register = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    userType: "", // Include userType in formData
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const notify = () => {
    toast.success('Account created successfully. Redirecting to login page...', {
      onClose: () => navigate("/") // Redirect to login page after toast closes
    });
  };

  const handleRegister = () => {
    navigate("/")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.userType
    ) {
      setErrorMessage("Please provide all fields");
      return;
    }
    try {
      const response = await fetch(
       `${BASE_URL}/api/v1/auth/register`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
         body: JSON.stringify(formData),

        }
      );
      const responseData = await response.json(); // Parse response data
      if (!response.ok) {
        throw new Error(responseData.message || "Registration failed");
      }
      setSuccessMessage(responseData.message);
      setErrorMessage(null);

      notify(); // Call the notify function to show the success message
      // navigate("/Login"); // Redirect the user to the login page
    } catch (error) {
      setErrorMessage(error.toString());
      setSuccessMessage(null);
    }
  };

  return (
    <div className="Register-page">
      <img src={sideImage} alt="" />
      <form className="Register-input-container" onSubmit={handleSubmit}>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red",textAlign:"center" }}>{errorMessage}</p>}

        <h2> Get More Opportunities</h2>

        {/* <button>
          <img src={google} alt="" />
          Login with Google
        </button> */}
        <div className="hr"></div>

        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          required
        >
          <option value="">Select User Type</option>
          <option value="jobSeeker">Job Seeker</option>
          <option value="jobProvider">Job Provider</option>
        </select>

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Name"
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter Last Name"
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email Address"
        />
        <label>
          Password:
          <i
            className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}
            onClick={togglePasswordVisibility}
            style={{
              fontSize: "2rem",
              // margin: "auto",
              cursor: "pointer",
            }}
          ></i>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder=" Enter Password"
        />
        <div className="Register-Submit">
          <button type="submit">Register</button>
        </div>
        <div className="navigator">
          <p>
            Already have an account? <h5 onClick={handleRegister}>Login</h5>
          </p>
        </div>
      </form>
      <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Zoom}
/>
    </div>
  );
};

export default Register;
