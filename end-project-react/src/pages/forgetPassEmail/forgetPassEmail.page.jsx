import { useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { useHistory } from "react-router-dom";
import forgetPassSchema from "../../validation/forgetPassEmail.validation";
import { toast } from "react-toastify";
import "../loginPage/login.css";

const ForgetPassPage = () => {
  const [email, setEmail] = useState("");

  const history = useHistory();

  const handle_Email_Change = (event) => {
    setEmail(event.target.value);
  };
  const handle_Submit = (event) => {
    if (event) {
      event.preventDefault();
    }
    const validated_Value = Joi.validate({ email }, forgetPassSchema, {
      abortEarly: false,
    });
    const { error } = validated_Value;
    if (error) {
      toast.error("🦄 Invalid Email", {
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
        .post("/auth/forgetPassword", {
          email,
        })
        .then(({ data }) => {
          console.log("data", data);
          history.push("/");
        })
        .catch((err) => {
          console.log("error from axios", err);
        });
    }
  };
  return (
    <div className="login-box">
      <h2>Forget Password</h2>
      <form onSubmit={handle_Submit}>
        <div className="user-box">
          <input type="email" value={email} onChange={handle_Email_Change} />
          <label>Email address</label>
        </div>
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

export default ForgetPassPage;
