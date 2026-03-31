"use client"

import { useState } from "react"

import MyRequests from './MyRequests'
import Payments from './Payments'
import Profile from './Profile'
import Sidebar from './Sidebar'
import DashboardHeader from './DashboardHeader'


import "../css/UserDashboard.css"
import NewRequests from "./NewRequests"

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("new-request")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [requests, setRequests] = useState([
    {
      id: 1,
      service: "Medicine Delivery",
      agent: "राम कुमार",
      status: "In Progress",
      amount: "₹150",
      date: "2024-01-15",
      rating: 4.5,
    },
    {
      id: 2,
      service: "Document Work",
      agent: "श्याम सिंह",
      status: "Completed",
      amount: "₹200",
      date: "2024-01-10",
      rating: 5,
    },
  ])

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
    },
    sidebar: {
      backgroundColor: "white",
      borderRight: "1px solid #e2e8f0",
      minHeight: "100vh",
    },
    tabButton: {
      width: "100%",
      justifyContent: "flex-start",
      padding: "0.75rem 1rem",
      marginBottom: "0.5rem",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      borderRadius: "0.5rem",
      transition: "all 0.3s ease",
      color: "#374151",
    },
    activeTabButton: {
      backgroundColor: "#3b82f6",
      color: "white",
    },
    statusBadge: {
      "In Progress": "bg-yellow-100 text-yellow-800",
      Completed: "bg-green-100 text-green-800",
      Pending: "bg-blue-100 text-blue-800",
    },
  }

  const handleNewRequest = (e) => {
    e.preventDefault()
    // Handle new request submission
    alert("Request submitted successfully!")
  }

  const renderContent = () => {
    switch (activeTab) {
      case "new-request":
        return <NewRequests />
      case "my-requests":
        return <MyRequests requests={requests} />
      case "payments":
        return <Payments requests={requests} />
      case "profile":
        return <Profile />
      default:
        return <NewRequests />
    }
  }

  return (
    <div className="dashboard">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-container">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="dashboard-main">{renderContent()}</main>
      </div>
    </div>
  )
}
