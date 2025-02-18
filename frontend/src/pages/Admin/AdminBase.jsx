import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminBase = () => {
    return (
        <div>
            <Outlet />
            <h1>admin base</h1>
        </div>
    )
}

export default AdminBase
