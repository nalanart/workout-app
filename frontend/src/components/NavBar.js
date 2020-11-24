import './NavBar.css'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="NavBar">
      <ul className="links">
        <Link to="/overview">
          <li>
            Overview
          </li>
        </Link>
        <Link to="/plan">
          <li>
            Plan
          </li>
        </Link>
        <Link to="/workout">
          <li>
            Current Workout
          </li>
        </Link>
        <Link to="/history">
          <li>
            History
          </li>
        </Link>
      </ul>
    </nav>
  )
}

export default NavBar
