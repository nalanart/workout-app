import './NavBar.css'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="NavBar">
      <ul className="links">
        <Link>
          <li>
            Overview
          </li>
        </Link>
        <Link to="/plan">
          <li>
            Today's Workout
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
