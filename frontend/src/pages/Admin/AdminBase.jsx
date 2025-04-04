import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminBase = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AdminBase
