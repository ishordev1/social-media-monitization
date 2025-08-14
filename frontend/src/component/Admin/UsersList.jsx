import React from 'react';
import { updateUser } from '../../service/UserService';
import { toast } from 'react-toastify';

const UsersList = ({ users, onStatusUpdate }) => {
  const handleStatusChange = (email, newStatus) => {
    const userToUpdate = users.find(user => user.email === email);
    const updatedUser = { ...userToUpdate, status: newStatus };

    updateUser(email, updatedUser)
      .then((response) => {
        toast.success("User status updated successfully!");
        // Update state in parent
        onStatusUpdate(email, newStatus);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Failed to update user status.");
      });
  };

  return (
    <div className="container mb-3">
      <div className="row d-flex justify-content-center align-items-center">
        {users && users.map((user) => (
          <div key={user.userId} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-lg border-0 overflow-hidden hover-effect">
              {/* Gradient header */}
              <div className="card-header-gradient py-3 px-5">
                <div className="d-flex align-items-center">
                  <div className="position-relative">
                    <img 
                      src={
                        user.imgName !== 'defaultProfile.png'
                          ? `/images/${user.imgName}`
                          : `https://ui-avatars.com/api/?name=${user.name}&background=random`
                      }
                      alt={user.name} 
                      className="rounded-circle me-3 img-thumbnail shadow-sm"
                      width="70"
                      height="70"
                    />
                    <span className={`position-absolute bottom-0 start-75 translate-middle p-1 border border-3 border-white rounded-circle ${getStatusIndicatorClass(user.status)}`}></span>
                  </div>
                  <div>
                    <h5 className="card-title mb-0 text-white">{user.name}</h5>
                    <small className="text-white-50">
                      <i className="fas fa-calendar-alt me-1"></i> {new Date(user.joinDate).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </div>
              
              <div className="card-body">
                <div className="user-details mb-3">
                  <div className="detail-item">
                    <i className="fas fa-envelope text-gradient me-2"></i>
                    <span>{user.email}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fab fa-instagram text-gradient me-2"></i>
                    <span>{user.instaUsername || 'Not provided'}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-star text-gradient me-2"></i>
                    <span>InstaScore: <span className="fw-bold">{user.instaScore}</span></span>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <span className={`badge rounded-pill ${getStatusBadgeClass(user.status)} px-3 py-2`}>
                    <i className={`${getStatusIcon(user.status)} me-1`}></i>
                    {user.status}
                  </span>
                  
                  <div className="dropdown">
                    <button 
                      className="btn btn-sm btn-gradient dropdown-toggle" 
                      type="button" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                    >
                      <i className="fas fa-cog me-1"></i> Update
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow">
                      <li>
                        <button 
                          className="dropdown-item d-flex align-items-center" 
                          onClick={() => handleStatusChange(user.email, 'PENDING')}
                        >
                          <i className="fas fa-clock text-warning me-2"></i> PENDING
                        </button>
                      </li>
                      <li>
                        <button 
                          className="dropdown-item d-flex align-items-center" 
                          onClick={() => handleStatusChange(user.email, 'VERIFY')}
                        >
                          <i className="fas fa-check-circle text-success me-2"></i> VERIFY
                        </button>
                      </li>
                      <li>
                        <button 
                          className="dropdown-item d-flex align-items-center" 
                          onClick={() => handleStatusChange(user.email, 'DISABLE')}
                        >
                          <i className="fas fa-ban text-danger me-2"></i> DISABLE
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper functions (unchanged)
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'PENDING': return 'bg-warning-light text-warning';
    case 'VERIFY': return 'bg-success-light text-success';
    case 'DISABLE': return 'bg-danger-light text-danger';
    default: return 'bg-secondary';
  }
};

const getStatusIndicatorClass = (status) => {
  switch (status) {
    case 'PENDING': return 'bg-warning';
    case 'VERIFY': return 'bg-success';
    case 'DISABLE': return 'bg-danger';
    default: return 'bg-secondary';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'PENDING': return 'fas fa-clock';
    case 'VERIFY': return 'fas fa-check-circle';
    case 'DISABLE': return 'fas fa-ban';
    default: return 'fas fa-circle';
  }
};

export default UsersList;
