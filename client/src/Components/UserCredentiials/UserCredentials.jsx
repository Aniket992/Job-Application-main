import axios from "axios";
import { UserContext } from "../../MyContext";
import React, { useContext, useState, useEffect } from "react";
import "./UserCredentials.css";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserCredentials = () => {
  const { user, setUser } = useContext(UserContext);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.delete("/api/v1/user/delete-account", {
        headers: headers,
      });

      if (response.status === 200) {
        setUser(null);
        localStorage.removeItem("user");
        toast.success("Account Deleted Successfully. Redirecting to home page");
        setTimeout(() => {
          navigate("/");
        }, 4000); 
      } else {
        toast.error("Failed to delete account. Please try again later.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    try {
      if (user.email === newEmail) {
        toast.error("No changes found in Email");
        return;
      }

      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.put(
        "/api/v1/user/change-email",
        { newEmail: newEmail },
        { headers: headers }
      );
      setSuccessMessage("Email changed successfully");
      setNewEmail("");
      setUser({ ...user, user: { ...user.user, email: newEmail } });
      toast.success("Email Updated successfully");
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.put(
        "/api/v1/user/change-password",
        {
          newPassword: newPassword,
        },
        { headers: headers }
      );
      setSuccessMessage("Password changed successfully");
      setNewPassword("");

      toast.success(response.data.message);
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
      // setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="credential-container">
      <div className="update-container">
        <h2>Change Email</h2>
        <form onSubmit={handleChangeEmail}>
          <input
            type="email"
            placeholder="New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
          <button type="submit">Change Email</button>
        </form>

        <h2>Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Change Password</button>
        </form>
        <h2>Delete Account</h2>

        <div className="accountDelete">
          <p>
            Deleting your account will permanently erase all your profile
            information, activity history, and uploaded content. This action is
            irreversible.{" "}
          </p>
          <p>
            You will lose access to your account and all associated features.
            You won't receive any further communications from us.
          </p>
          <button onClick={handleDelete}>Delete Account</button>
        </div>
      </div>

      <div className="termCondition">
        <h3> Terms of Service</h3>
        <p>
          Welcome to our website. By accessing this website, you agree to be
          bound by these terms of service, all applicable laws, and regulations,
          and agree that you are responsible for compliance with any applicable
          local laws. If you do not agree with any of these terms, you are
          prohibited from using or accessing this site. The materials contained
          in this website are protected by applicable copyright and trademark
          law. Privacy Policy Your privacy is important to us. It is our policy
          to respect your privacy regarding any information we may collect from
          you across our website, [Your Website Name], and other sites we own
          and operate. 
        </p>
        <h3>Privacy Policy</h3>
        <p>
          Your privacy is important to us. It is our policy to respect your
          privacy regarding any information we may collect from you across our
          website, [Your Website Name], and other sites we own and your
          knowledge and consent. We also let you know why we're collecting as
          long as necessary to provide you with your requested service. What
          data we store, we'll protect within commercially acceptable means to
          prevent loss and theft, as well as unauthorized access, disclosure,
          copying, use, or modification. We don't share any personally
          identifying information publicly or with third-parties, except when
          required to by law. Our website may link to external sites that are
          not operated by us. 
        </p>
      </div>
      <ToastContainer
        position="top-right"
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

export default UserCredentials;
