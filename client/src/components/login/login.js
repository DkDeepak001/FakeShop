import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Login() {
  const [token, setToken] = useState(false);
  const [verifed, setVerified] = useState(false);
  const [formDetails, setFormDetails] = useState({
    userName: "",
    password: "",
  });

  const updateHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    validateToken(token);
  }, [token]);

  const validateToken = async (rawToken) => {
    const response = await axios.post(
      "https://fakeshop-ecommerce.herokuapp.com/validateToken",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: rawToken,
      }
    );
    if (response.data.tokenValidated) {
      // localStorage.setItem("verifiedToken",true);
      setVerified(true);
    }
  };

  const formData = async (data) => {
    const bodyData = data;
    if (data.userName !== "" && data.password !== "") {
      const response = await axios.post("https://fakeshop-ecommerce.herokuapp.com/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: bodyData,
      });
      if (!response.data.error) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          validateToken(response.data.token);
        }
      } else {
        swal(response.data.error);
      }
    } else {
      swal("please fill all details");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    formData(formDetails);
  };
  return (
    <>
      {!localStorage.getItem("verifiedToken") &&
      !localStorage.getItem("token") ? (
        <div className="login-container">
          <div className="card">
            <form>
              <h2 className="title"> Log in</h2>
              <p className="subtitle">
                Don't have an account?{" "}
                <Link to="/signup">
                  <a href="#" className="link">
                    {" "}
                    sign Up
                  </a>
                </Link>
              </p>

              <p className="or">
                <span>or</span>
              </p>

              <div className="email-login">
                <label>
                  {" "}
                  <b>Username</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="userName"
                  value={formDetails.userName}
                  required
                  onChange={updateHandler}
                />
                <label>
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formDetails.password}
                  required
                  onChange={updateHandler}
                />
              </div>
              <button className="cta-btn" onClick={submitForm}>
                Log In
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default Login;
