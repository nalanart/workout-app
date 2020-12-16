import './NavBar.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function NavBar({ loggedIn, logout }) {
  const [page, setPage] = useState()

  const getPageClass = pageName => pageName === page ? 'nav-link active' : 'nav-link'

  return loggedIn ?
    <nav className="NavBar">
      <ul className="nav justify-content-center nav-tabs">
        <li className="nav-item">
          <Link to="/overview" className={getPageClass('overview')} onClick={() => setPage('overview')}>
            Overview
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/workout" className={getPageClass('workout')} onClick={() => setPage('workout')}>
            Current Workout
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/history" className={getPageClass('history')} onClick={() => setPage('history')}>
            History
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={logout}>
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  : 
    <nav className="NavBar">
      <ul className="nav justify-content-center nav-tabs">
        <li className="nav-item">
          <Link to="login" className={getPageClass('login')} onClick={() => setPage('login')}>
            Log in
          </Link>
        </li>
        <li className="nav-item">
          <Link to="register" className={getPageClass('register')} onClick={() => setPage('register')}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
}

export default NavBar
