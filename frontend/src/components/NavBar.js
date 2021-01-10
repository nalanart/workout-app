import './NavBar.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function NavBar({ loggedIn, logout }) {
  const [page, setPage] = useState('overview')

  const getPageClass = pageName => pageName === page ? 'nav-link active' : 'nav-link'

  return loggedIn === 'true' ?
    <nav className="NavBar">
      <div className="nav-links-container">
        <ul className="nav">
          <li>
            <div className="logo-container">
              <Link to="/overview"><img src="https://www.flaticon.com/svg/static/icons/svg/249/249187.svg" alt="dumbbell" height="70"/></Link>
              <Link to ="/overview" style={{ color: 'white', textDecoration: 'none' }}><h1 className="app-name">&nbsp;Workout App</h1></Link>
            </div>
          </li>
          <div className="nav-links">
            <li className="link">
              <Link to="/overview" className={getPageClass('overview')} onClick={() => setPage('overview')}>
                Overview
              </Link>
            </li>
            <li className="link">
              <Link to="/workout" className={getPageClass('workout')} onClick={() => setPage('workout')}>
                Current Workout
              </Link>
            </li>
            <li className="link">
              <Link to="/history" className={getPageClass('history')} onClick={() => setPage('history')}>
                History
              </Link>
            </li>
            <li className="link">
              <Link to="/" className="nav-link" onClick={logout}>
                Log out
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  : 
    <nav className="NavBar">
      <div className="nav-links-container">
        <ul className="nav">
          <li>
            <div className="logo-container">
              <Link to="/"><img src="https://www.flaticon.com/svg/static/icons/svg/249/249187.svg" alt="dumbbell" height="70"/></Link>
              <Link to ="/" style={{ color: 'white', textDecoration: 'none' }}><h1 className="app-name">&nbsp;Workout App</h1></Link>
            </div>
          </li>
          <li>
            <button className="btn">
              <a className="register-login-anchor" href="/login"><h1>Log In</h1></a>
            </button>
          </li>
        </ul>
      </div>
    </nav>
}

export default NavBar
