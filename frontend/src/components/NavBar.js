import './NavBar.css'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="NavBar">
      <ul className="links">
        <Link to="/overview" style={{ textDecoration: 'none' }}>
          <li>
            Overview
          </li>
        </Link>
        <Link to="/plan" style={{ textDecoration: 'none' }}>
          <li>
            Plan
          </li>
        </Link>
        <Link to="/workout" style={{ textDecoration: 'none' }}>
          <li>
            Current Workout
          </li>
        </Link>
        <Link to="/history" style={{ textDecoration: 'none' }}>
          <li>
            History
          </li>
        </Link>
      </ul>
    </nav>
  )
}

export default NavBar
