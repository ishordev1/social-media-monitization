import React, { useState } from "react";
import { toast } from "react-toastify";
import { signUp } from "../service/LoginService";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    imgName: "",
    instaUsername: "",
    role: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (API Call later)
  const handleSubmit = (e) => {
    e.preventDefault();

    signUp(formData).then((data) => {
      console.log(data);
      toast.success("Login successful");
    }
    ).catch((error) => {
      console.log(error);
      toast.error("Login failed");
    }
    );





  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="card mt-5  p-3 shadow" style={{ width: "600px" }}>
        <div className="card-body">
          <h3 className="card-title text-center">Signup Here</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Left Side */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
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
              </div>

              {/* Right Side */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Profile Image Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="imgName"
                    value={formData.imgName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Instagram Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="instaUsername"
                    value={formData.instaUsername}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-control"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="CUSTOMER">Customer</option>
                    <option value="ADMIN">Admin</option>
                    <option value="BRAND">Brand</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
