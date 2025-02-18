import React from 'react'
import { Outlet } from 'react-router-dom'

const UserBase = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default UserBase
