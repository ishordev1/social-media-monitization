import React, { useEffect, useState } from "react";
import { getUserByRoleAndStatus, searchUserByRoleAndName } from "../../service/UserService";
import UsersList from "../../component/Admin/UsersList";


const ShowBrands = () => {
 const [users, setUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All"); // default filter
  const [searchQuery, setSearchQuery] = useState(""); // search input state
  const [loading, setLoading] = useState(false);

  // Fetch when filter changes (and search is empty)
  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchUsersByFilter();
    }
  }, [filterStatus]);

  // Function to load users by filter
  const fetchUsersByFilter = () => {
    setLoading(true);
    getUserByRoleAndStatus("brand", filterStatus.toLowerCase() === "all" ? "" : filterStatus)
      .then((res) => {
        setUsers(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  // Update state locally when status changes
  const updateUserStatusInState = (email, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.email === email ? { ...user, status: newStatus } : user
      )
    );
  };

  // Handle filter dropdown change
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Handle search box changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      // If search is cleared, reload by filter
      fetchUsersByFilter();
    } else {
      // Search API call
      setLoading(true);
      searchUserByRoleAndName("brand", value)
        .then((res) => {
          setUsers(res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="fw-bold">All Customer</h3>
        <div className="d-flex">
          <button className="btn btn-primary me-2 d-flex align-items-center">
            <i className="fas fa-plus me-1"></i> Add
          </button>
          {/* Search Box */}
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {/* Filter dropdown */}
          <select
            className="form-select ms-2"
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="verify">Verify</option>
            <option value="disable">Disable</option>
          </select>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      {/* Show table or empty message */}
      {!loading && (
        users.length !== 0 ? (
          <UsersList users={users} onStatusUpdate={updateUserStatusInState} />
        ) : (
          <div className="row justify-content-center mt-5">
            <div className="col-12 text-center">
              <i className="fas fa-users text-muted mb-3" style={{ fontSize: "4rem", opacity: 0.5 }}></i>
              <h4 className="fw-bold text-secondary">No Users Available</h4>
              <p className="text-muted">
                Try changing the filter or search term.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};


export default ShowBrands;
