"use client"

import { useEffect, useState } from "react"
import "../css/Stats.css"

// Import JSON data at the top
import statsData from "../data/stats.json"

export default function Stats() {
  const [stats, setStats] = useState({
    agents: 0,
    customers: 0,
    villages: 0,
    success: 0,
  })

  useEffect(() => {
    // TODO: Backend connection - Fetch real stats from API
    // GET /api/stats
    // Response: { agents, customers, villages, successRate }

    // Simulating API call with animation
    const targetStats = {
      agents: statsData.platform.totalAgents,
      customers: statsData.platform.totalUsers,
      villages: statsData.platform.villagesConnected,
      success: statsData.platform.successRate,
    }

    const animateStats = () => {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0

      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setStats({
          agents: Math.floor(targetStats.agents * progress),
          customers: Math.floor(targetStats.customers * progress),
          villages: Math.floor(targetStats.villages * progress),
          success: Math.floor(targetStats.success * progress),
        })

        if (currentStep >= steps) {
          clearInterval(interval)
          setStats(targetStats)
        }
      }, stepDuration)
    }

    animateStats()
  }, [])

  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.agents}+</div>
            <div className="stat-label">Active Agents</div>
            <div className="stat-sublabel">Darbhanga & Madhubani में</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.customers}+</div>
            <div className="stat-label">Happy Customers</div>
            <div className="stat-sublabel">Satisfied Users</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.villages}+</div>
            <div className="stat-label">Villages Connected</div>
            <div className="stat-sublabel">और बढ़ रहा है</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.success}%</div>
            <div className="stat-label">Success Rate</div>
            <div className="stat-sublabel">Guaranteed Service</div>
          </div>
        </div>
      </div>
    </section>
  )
}
