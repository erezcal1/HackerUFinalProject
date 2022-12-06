import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import registerSchema from "../../validation/userRegister.validation";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import "./userRegister.css";

const RegisterUserPage = () => {
  const [first_Name, setFirstName] = useState("");
  const [last_Name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_Password, setConfirmPassword] = useState("");
  const [show_Pass_Err_Msg, setShowPassErrMsg] = useState(false);
  const [emailExist, setEmailExist] = useState(false);

  const history = useHistory();

  const handle_FirstName_Change = (event) => {
    setFirstName(event.target.value);
  };
  const handle_LastName_Change = (event) => {
    setLastName(event.target.value);
  };
  const handle_Email_Change = (event) => {
    setEmail(event.target.value);
  };
  const handle_Password_Change = (event) => {
    setPassword(event.target.value);
  };
  const handle_ConfirmPassword_Change = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handle_Submit = (event) => {
    event.preventDefault();
    if (password !== confirm_Password) {
      setShowPassErrMsg(true);
    }
    const validated_Value = Joi.validate(
      { first_Name, email, password, confirm_Password },
      registerSchema,
      { abortEarly: false }
    );
    const { error } = validated_Value;
    if (error) {
      for (let item of error.details) {
        toast.error(
          `${item.message
            .replaceAll('"', "")
            .replaceAll("first_Name", "First Name")
            .replaceAll("confirm_Password", "Confirm Password")
            .replaceAll("one of [ref:password]", "the same as password")}`,
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } else {
      if (password === confirm_Password) {
        axios
          .post("/auth/signup", {
            firstName: first_Name,
            lastName: last_Name,
            email: email,
            password: password,
          })
          .then((res) => {
            console.log(res.data);
            history.push("/login", {
              email: email,
              password: password,
              viz: false,
            });
          })
          .catch((err) => {
            console.log("error form axios", err);
            if (err.response.data.message === "Email already exists") {
              setEmailExist(true);
            }
          });
      }
    }
  };
  return (
    <div className="register-box">
      <form onSubmit={handle_Submit}>
        <h2>User Registration</h2>
        <div className="user-box">
          <input
            type="text"
            value={first_Name}
            onChange={handle_FirstName_Change}
          />
          <label>First Name:</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            value={last_Name}
            onChange={handle_LastName_Change}
          />
          <label>First Name:</label>
        </div>
        <div className="user-box">
          <input type="email" value={email} onChange={handle_Email_Change} />
          <label htmlFor="input_Email" className="form-label">
            Email:
          </label>
        </div>
        <div className="user-box">
          <input
            type="password"
            value={password}
            onChange={handle_Password_Change}
          />
          <label>Password:</label>
          {password.length < 8 && (
            <div id="emailHelp" className="form-text">
              please enter password with at least 6 digits
            </div>
          )}
        </div>{" "}
        <br />
        <div className="user-box">
          <input
            type="password"
            className="form-control"
            id="input_ConfirmPassword"
            value={confirm_Password}
            onChange={handle_ConfirmPassword_Change}
          />
          <label>Confirm Password:</label>
        </div>
        {show_Pass_Err_Msg && (
          <div className="alert alert-danger" role="alert">
            The Password and confirm Password must be the same
          </div>
        )}
        {emailExist && (
          <div className="alert alert-danger" role="alert">
            Email Already exist
          </div>
        )}
        <button type="submit" className="btn btn-primary margin-button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Sign in
        </button>
      </form>
    </div>
  );
};
export default RegisterUserPage;
