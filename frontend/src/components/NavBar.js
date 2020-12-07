import './NavBar.css'
import { Link } from 'react-router-dom'


function NavBar() {
  return (
    <nav className="NavBar">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link to="/overview" className="nav-link">
            Overview
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/plan" className="nav-link">
            Plan
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/workout" className="nav-link">
            Current Workout
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/history" className="nav-link">
            History
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
