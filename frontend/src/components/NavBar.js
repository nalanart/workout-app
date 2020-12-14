import './NavBar.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function NavBar() {
  const [page, setPage] = useState('')

  const getPageClass = pageOption => pageOption === page ? 'nav-link active' : 'nav-link'

  return (
    <nav className="NavBar bg-light">
      <ul className="nav justify-content-center nav-tabs">
        <li className="nav-item">
          <Link to="/overview" className={getPageClass('overview')} onClick={() => setPage('overview')}>
            Overview
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/plan" className={getPageClass('plan')} onClick={() => setPage('plan')}>
            Plan
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/workout" className={getPageClass('currentWorkout')} onClick={() => setPage('currentWorkout')}>
            Current Workout
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/history" className={getPageClass('history')} onClick={() => setPage('history')}>
            History
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
