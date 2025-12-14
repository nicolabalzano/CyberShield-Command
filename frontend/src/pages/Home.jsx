import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1 className="hero-title">CyberShield Command</h1>
        <p className="hero-subtitle">Master cybersecurity through interactive challenges</p>
        
        <div className="hero-stats">
          <div className="stat-card">
            <h3>🎯</h3>
            <p>50+ Challenges</p>
          </div>
          <div className="stat-card">
            <h3>🏆</h3>
            <p>Leaderboard Rankings</p>
          </div>
          <div className="stat-card">
            <h3>📚</h3>
            <p>Learn & Practice</p>
          </div>
        </div>

        <div className="cta-buttons">
          <Link to="/missions" className="btn btn-primary">Start Playing</Link>
          <Link to="/leaderboard" className="btn btn-secondary">View Leaderboard</Link>
        </div>
      </div>

      <div className="features">
        <h2>Game Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🔐 Password Security</h3>
            <p>Learn to create strong passwords and understand password attacks</p>
          </div>
          <div className="feature-card">
            <h3>🦠 Malware Detection</h3>
            <p>Identify suspicious files and malware patterns</p>
          </div>
          <div className="feature-card">
            <h3>🌐 Network Security</h3>
            <p>Master network protocols and defend against cyber attacks</p>
          </div>
          <div className="feature-card">
            <h3>🔑 Cryptography</h3>
            <p>Explore encryption techniques and cryptographic systems</p>
          </div>
          <div className="feature-card">
            <h3>🎣 Phishing</h3>
            <p>Detect and avoid phishing attacks and social engineering</p>
          </div>
          <div className="feature-card">
            <h3>🛡️ Vulnerability</h3>
            <p>Identify and patch system vulnerabilities</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
