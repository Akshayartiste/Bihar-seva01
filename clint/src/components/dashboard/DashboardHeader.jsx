"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Menu, X, Bell, User, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import data from "../data/notification.json"
import "../css/DashboardHeader.css"

export default function DashboardHeader({ sidebarOpen, setSidebarOpen }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState(data.notifications)
  const dropdownRef = useRef(null)

  // Outside click to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle delete of one notification
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id))
  }

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-content">
        <div className="dashboard-header-left">
          {/* <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button> */}

          <Link to="/user-dashboard" className="dashboard-logo">
            {/* <MapPin className="logo-icon" /> */}
            <span>Hii राजेश कुमार</span>
          </Link>
        </div>

        <div className="dashboard-header-right">
          <div className="notification-wrapper" ref={dropdownRef}>
            <button
              className="notification-btn"
              onClick={() => setShowNotifications((prev) => !prev)}
            >
              <Bell />
              <span className="notification-badge">{notifications.length}</span>
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="dropdown-header">
                  <span>Notifications</span>
                </div>

                <div className="dropdown-content">
                  {notifications.length === 0 ? (
                    <p className="no-notification">कोई notification नहीं है</p>
                  ) : (
                    notifications.map((note) => (
                      <div className="notification-item" key={note.id}>
                        <div>
                          <p className="notification-message">{note.message}</p>
                          <span className="notification-time">{note.time}</span>
                        </div>
                        <button
                          className="notification-delete"
                          onClick={() => deleteNotification(note.id)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="user-menu">
            <User className="user-icon" />
            <span>राजेश कुमार</span>
          </div>
        </div>
      </div>
    </header>
  )
}
