import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doLogin } from "../auth/Index";
import { login } from "../service/LoginService";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const jwtTokenData = await login(formData);
      await doLogin(jwtTokenData, () => {
        toast.success("Login successful");
        if (jwtTokenData.user.role === "CUSTOMER") {
          navigate('/customer/home');
        } else if (jwtTokenData.user.role === "ADMIN") {
          navigate('/admin/home/dashboard');
        }
        else {
          navigate('/brand/home/dashboard');
        }
        setTimeout(() => {
          window.location.reload();
        }, 0);
      });
    } catch (err) {
    console.log("Login error:", err.response?.data?.message);
    toast.error(err.response?.data?.message || "Login failed. Please check your credentials.");
  }
  };




  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="card mt-5 p-3 shadow" style={{ width: "400px" }}>
          <div className="card-body">
            <h3 className="card-title text-center">Signin Here</h3>
            <hr />
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <small className="text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
              </div>
              <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
