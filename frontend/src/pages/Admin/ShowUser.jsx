import React, { useEffect, useState } from 'react';
import UsersList from '../../component/Admin/UsersList';
import { getUserByRole } from '../../service/UserService';

const ShowUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUserByRole("user").then((res) => {
            // console.log("data" + JSON.stringify(res));
            setUsers(res);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="container mt-4 ">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h3 className="fw-bold">All Customer</h3>
                <div className="d-flex">

                    <button className="btn btn-primary me-2 d-flex align-items-center">
                        <i className="fas fa-plus me-1"></i> Add
                    </button>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                    />
                    <select className="form-select ms-2">
                        <option value="all">Filter</option>
                        <option value="pending">Pending</option>
                        <option value="verify">Verify</option>
                        <option value="disable">Disable</option>
                        </select>
                </div>
                
            </div>
          
                <UsersList users={users} />
           
        </div>
    );
};

export default ShowUser;