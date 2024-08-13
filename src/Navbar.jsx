import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ axiosInstance }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const authToken = sessionStorage.getItem("auth_token");

      const response = await axiosInstance.post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        sessionStorage.removeItem("auth_token");
        navigate("/");
      } else {
        console.error("Error during logout:", response.data);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {!sessionStorage.getItem("auth_token") && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {!sessionStorage.getItem("auth_token") && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}

        {sessionStorage.getItem("auth_token") && (
          <li>
            <Link to="/ponuda">Ponuda</Link>
          </li>
        )}
        {sessionStorage.getItem("auth_token") && (
          <li onClick={handleLogout}>
            <a href="#">Logout</a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
