import { useEffect, useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useAfterLogin from "../../hooks/useAfterLogin.hook";
import loginSchema from "../../validation/login.validate";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show_Err_Msg, setShowErrMsg] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const afterLogin = useAfterLogin();

  useEffect(() => {
    console.log(location);
    if (location.state && location.state.email && location.state.password) {
      setEmail(location.state.email);
      setPassword(location.state.password);
    }
  }, []);

  useEffect(() => {
    if (
      email !== "" &&
      password !== "" &&
      location.state &&
      location.state.email &&
      location.state.password
    ) {
      handle_Submit();
    }
  }, []);

  const handle_Email_Change = (event) => {
    setEmail(event.target.value);
  };
  const handle_Password_Change = (event) => {
    setPassword(event.target.value);
  };
  const handle_ForgetPass = (event) => {
    if (event) {
      event.preventDefault();
    }
    history.push("/forgetPass");
  };
  const handle_Submit = (event) => {
    if (event) {
      event.preventDefault();
    }
    const validated_Value = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });
    const { error } = validated_Value;
    if (error) {
      toast.error("🦄 Invalid Email Or Password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      axios
        .post("/auth/signIn", {
          email,
          password,
        })
        .then(({ data }) => {
          setShowErrMsg(false);
          console.log("data", data);
          afterLogin(data.message);
          history.push("/");
        })
        .catch((err) => {
          setShowErrMsg(true);
          console.log("error from axios", err);
        });
    }
  };
  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handle_Submit}>
        <div className="user-box">
          <input type="email" value={email} onChange={handle_Email_Change} />
          <label>Email address</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            value={password}
            onChange={handle_Password_Change}
          />
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          {password.length < 6 && (
            <div id="emailHelp" className="form-text">
              please enter your password with at least 6 digits
            </div>
          )}
        </div>
        {show_Err_Msg && (
          <div className="alert alert-danger" role="alert">
            Email or Password is incorrect
          </div>
        )}
        <Link onClick={handle_ForgetPass} className="forget-password">
          Forget Password
        </Link>
        <button type="submit" className="btn btn-primary margin-button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
