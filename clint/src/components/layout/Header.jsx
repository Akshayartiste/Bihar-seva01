import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { MapPin, Menu, X } from "lucide-react"
import "../css/Header.css"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user, setUser] = useState(null)

  const navRef = useRef(null)
  const profileRef = useRef(null)

  // GET USER FROM LOCALSTORAGE
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser))
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("User parse error:", error)
      setUser(null)
    }
  }, [])

  // Close menu + profile on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleNavLinkClick = () => setIsMenuOpen(false)

  // Logout function
  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/login"
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <MapPin className="logo-icon" />
            <Link to="/" className="main-logo">
              <h1>Bihar-Seva</h1>
            </Link>
            <span className="location-tag">Darbhanga • Madhubani</span>
          </div>

          <nav ref={navRef} className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <Link to="/services" className="nav-link" onClick={handleNavLinkClick}>
              Services
            </Link>
            <Link to="/book-agent" className="nav-link" onClick={handleNavLinkClick}>
              Book Agent
            </Link>
          
            
            
            <Link to="/agent" className="nav-link" onClick={handleNavLinkClick}>
              Agent
            </Link>
              
            <Link to="/Contact" className="nav-link" onClick={handleNavLinkClick}>
              Contact
            </Link>
            <Link to="/About" className="nav-link" onClick={handleNavLinkClick}>
              About
            </Link>
          </nav>

          <div className="menu-actions">
            {user ? (
              <div className="profile-section" ref={profileRef}>
                <div
                  className="profile-name"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  👤 {user.name}
                </div>

                {isProfileOpen && (
                  <div className="profile-dropdown" data-open={isProfileOpen}>
                    <Link to="/user-profile" className="dropdown-item">
                      Profile
                    </Link>
                    <Link to="/user-dashboard" className="dropdown-item" onClick={handleNavLinkClick}>
                       Dashboard
                    </Link>
                    <button className="dropdown-item logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btnn-primary login-btn">
                Login करें
              </Link>
            )}

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}