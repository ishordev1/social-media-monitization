import React, { useCallback, useEffect, useState } from 'react'
import { getCurrentUserDetails } from '../../auth/Index';
import { toast } from 'react-toastify';
import { updateUser } from '../../service/UserService';


const UpdateProfile = ({ userData }) => {

  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    instaUsername: userData.instaUsername,
    instaScore: userData.instaScore,
    role: userData.role,
    imgName: userData.imgName,
  });



  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await updateUser(userData.userId, formData);
    

      console.log(res);
      setFormData(res);
      console.log(formData);
      toast.success("Profile updated successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error during update:", error);
      toast.error(error.response.data.message || "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  }

  return (

    <div>


      <div className="container p-4">
        <button
          className="btn btn-danger shadow-lg"
          type="button"
          onClick={() => setShowOffcanvas(true)}
        >
          <span><i className="fa-solid fa-pen-to-square me-2"></i>Edit Profile</span>
        </button>

        <div
          className={`offcanvas offcanvas-start ${showOffcanvas ? 'show' : ''}`}
          tabIndex={-1}
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >


          <div className="offcanvas-header bg-light border-bottom">
            <h5 className="offcanvas-title fw-bold text-primary" id="offcanvasExampleLabel">
              <i className="fa-solid fa-user-edit me-2"></i>Update Profile
            </h5>
           
            <button
              type="button"
              className="btn-close text-reset"
              aria-label="Close"
              onClick={() => setShowOffcanvas(false)}
            />
          </div>

          <div className="offcanvas-body">
          
            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label d-flex align-items-center">
                  <i className="fa-solid fa-signature me-2 text-primary"></i> Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  value={formData.name} // Data binding

                />
              </div>

              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label d-flex align-items-center">
                  <i className="fa-solid fa-at me-2 text-primary"></i> Email Address
                </label>
                <input
                  type="email"
                  className="form-control"

                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="instaInput" className="form-label d-flex align-items-center">
                  <i className="fa-brands fa-instagram me-2 text-primary"></i> Instagram Username
                </label>
                <input
                  type="text"
                  className="form-control"

                  value={formData.instaUsername} // Data binding
                  onChange={(e) => setFormData({ ...formData, instaUsername: e.target.value })}
                />
              </div>
             

              {/* Submit Button with Loading State */}
              <button
                type="submit"
                className="btn btn-primary w-100 mt-3 shadow"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-cloud-arrow-up me-2"></i>
                    Submit Changes
                  </>
                )}
              </button>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
};

export default UpdateProfile;