import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { signUp, uploadProfileImage } from "../service/LoginService";

const Signup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    instaUsername: "",
    role: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // File handling
  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (formData.email == "" || formData.password == '' || formData.role == '') {
        toast.error("field not  be blank...");
        return
      }
      if (imageFile == null) {
        toast.error("please upload image..");
        return
      }


      const imageUrl = await uploadProfileImage(imageFile);
      // console.log("Image uploaded:", imageUrl);

      // 2. Add image URL to formData
      const finalData = { ...formData, imgName: imageUrl };

      // 3. Save User
      await signUp(finalData);

      toast.success("Signup successful!");
      // navigate("/signin");
    } catch (err) {
      console.error(err);
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="card signup-card shadow-lg animate-pop">
        <div className="card-body p-4 ">
          <div className="mb-3">
            <h2 className=" text-center fw-bold mb-1">Create your account</h2>
            <p className=" text-center text-muted mb-0">
              Join the Social Media Monetization platform
            </p>
          </div>

          {/* Image Upload Section - TOP */}
          <div className="text-center mb-3">
            <div
              className="dropzone mb-3"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
              {!imagePreview ? (
                <div className="dz-placeholder">
                  <i className="fa fa-cloud-upload fa-2x mb-2"></i>
                  <p className="mb-0 fw-semibold">Upload your profile image</p>
                  <small className="text-muted">Drag & drop or click to browse</small>
                </div>
              ) : (
                <div className="dz-preview">
                  <img src={imagePreview} alt="preview" className="img-fluid rounded-3" />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview("");
                      setImageFile(null);
                    }}
                  >

                    <i className="fa fa-times me-1"></i>Remove
                  </button>
                </div>
              )}
            </div>


          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="row g-4">
              {/* Left */}
              <div className="col-md-6">
                <div className="form-floating modern-input">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="name"><i className="fa fa-user me-2"></i>Name</label>
                </div>

                <div className="form-floating modern-input mt-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email"><i className="fa fa-envelope me-2"></i>Email</label>
                </div>

                <div className="position-relative mt-3">
                  <div className="form-floating modern-input">
                    <input
                      type={showPass ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="password"><i className="fa fa-lock me-2"></i>Password</label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-link toggle-pass"
                    onClick={() => setShowPass((s) => !s)}
                  >
                    <i className={`fa ${showPass ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              {/* Right */}
              <div className="col-md-6">
                <div className="form-floating modern-input">
                  <input
                    type="text"
                    className="form-control"
                    id="instaUsername"
                    name="instaUsername"
                    placeholder="Instagram Username"
                    value={formData.instaUsername}
                    onChange={handleChange}
                  />
                  <label htmlFor="instaUsername">
                    <i class="fa-brands fa-instagram"></i>Instagram Username
                  </label>
                </div>

                {/* FIXED Select Box */}
                <div className="form-floating modern-input mt-3">
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="CUSTOMER">Customer</option>
                    <option value="ADMIN">Admin</option>
                    <option value="BRAND">Brand</option>
                  </select>
                  <label htmlFor="role">
                    <i className="fa fa-briefcase me-2"></i>Role
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mt-4 btn-cta"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" />
              ) : (
                <i className="fa fa-check me-2"></i>
              )}
              {loading ? "Creating account..." : "Create account"}
            </button>

            <p className="text-center text-muted mt-3 small">
              By continuing, you agree to our Terms & Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
