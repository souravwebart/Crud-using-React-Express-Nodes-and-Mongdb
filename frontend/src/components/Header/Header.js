import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <nav className="navbar bg-dark">
        <div className="container">
          <div className="row">
            <NavLink className="navbar-brand" to="/">
              CRUD
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header