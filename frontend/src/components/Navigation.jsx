import { Link } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⚔️</span>
          CyberShield Command
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/missions" className="nav-link">Missions</Link>
          </li>
          <li className="nav-item">
            <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
