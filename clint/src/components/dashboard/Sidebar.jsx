"use client"

import { MapPin, Plus, Package, CreditCard, User } from "lucide-react"
import "../css/Sidebar.css"

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    {
      id: "new-request",
      label: "New Request",
      icon: <Plus className="menu-icon" />,
      description: "नई service book करें",
    },
    {
      id: "my-requests",
      label: "My Requests",
      icon: <Package className="menu-icon" />,
      description: "आपकी सभी requests",
    },
    {
      id: "payments",
      label: "Payments",
      icon: <CreditCard className="menu-icon" />,
      description: "Payment history",
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User className="menu-icon" />,
      description: "Account settings",
    },
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    setSidebarOpen(false) // For mobile: close sidebar overlay (if ever used)
  }

  return (
    <>
      {/* Optional Overlay (if you're still using it) */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* Hide this header on mobile, show only on desktop */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <MapPin className="logo-icon" />
            <div>
              <h2>Dashboard</h2>
              <p>Service Panel</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <ul className="nav-list">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`nav-button ${activeTab === item.id ? "active" : ""}`}
                    onClick={() => handleTabClick(item.id)}
                  >
                    {item.icon}
                    <div className="nav-content">
                      <span className="nav-label">{item.label}</span>
                      <span className="nav-description">{item.description}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help section visible only on desktop */}
          <div className="nav-section">
            <div className="help-card">
              <h4>Need Help?</h4>
              <p>हमारी customer support team आपकी मदद के लिए तैयार है।</p>
              <a href="tel:+919876543210" className="help-button">
                Call Support
              </a>
            </div>
          </div>
        </nav>
      </aside>
    </>
  )
}
