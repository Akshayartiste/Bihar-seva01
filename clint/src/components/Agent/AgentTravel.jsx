"use client"

import { useState, useEffect } from "react"
import "../css/AgentTravel.css"

export default function AgentTravel() {
  const [activeTab, setActiveTab] = useState("announce-travel")
  const [travelAnnouncements, setTravelAnnouncements] = useState([])
  const [myTravels, setMyTravels] = useState([])

  // Sample data
  const sampleTravels = [
    {
      id: 1,
      agentName: "राम कुमार शर्मा",
      from: "Darbhanga City",
      to: "Madhubani City",
      departureTime: "10:00 AM",
      date: "2024-01-20",
      availableSlots: 3,
      services: ["Medicine Delivery", "Document Work", "Shopping"],
      vehicleType: "Car",
      fare: "₹50 per service",
      status: "Active",
      subscribers: 12,
    },
    {
      id: 2,
      agentName: "श्याम सिंह",
      from: "Madhubani City",
      to: "Darbhanga City",
      departureTime: "2:00 PM",
      date: "2024-01-20",
      availableSlots: 2,
      services: ["Banking", "Tickets", "Document Work"],
      vehicleType: "Motorcycle",
      fare: "₹30 per service",
      status: "Active",
      subscribers: 8,
    },
  ]

  const myTravelData = [
    {
      id: 1,
      from: "Darbhanga City",
      to: "Madhubani City",
      departureTime: "10:00 AM",
      date: "2024-01-20",
      status: "Active",
      subscribers: 12,
      bookings: 3,
    },
  ]

  useEffect(() => {
    setTravelAnnouncements(sampleTravels)
    setMyTravels(myTravelData)
  }, [])

  const [newTravel, setNewTravel] = useState({
    from: "",
    to: "",
    date: "",
    departureTime: "",
    availableSlots: "",
    services: [],
    vehicleType: "",
    fare: "",
  })

  const locations = [
    { value: "darbhanga-city", label: "Darbhanga City" },
    { value: "madhubani-city", label: "Madhubani City" },
    { value: "rampur", label: "Village Rampur" },
    { value: "shyampur", label: "Village Shyampur" },
  ]

  const serviceOptions = ["Medicine Delivery", "Document Work", "Shopping", "Banking", "Tickets", "Recharge"]

  const handleServiceToggle = (service) => {
    setNewTravel((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleSubmitTravel = (e) => {
    e.preventDefault()
    const travelData = {
      ...newTravel,
      id: Date.now(),
      agentName: "राम कुमार शर्मा", // Current agent
      status: "Active",
      subscribers: 0,
      bookings: 0,
    }

    setMyTravels((prev) => [...prev, travelData])
    setTravelAnnouncements((prev) => [...prev, travelData])

    // Send notifications to users
    sendTravelNotifications(travelData)

    // Reset form
    setNewTravel({
      from: "",
      to: "",
      date: "",
      departureTime: "",
      availableSlots: "",
      services: [],
      vehicleType: "",
      fare: "",
    })

    alert("Travel announcement created! Users will be notified.")
  }

  const sendTravelNotifications = (travelData) => {
    // This would integrate with the notification system
    const notification = {
      id: Date.now(),
      type: "info",
      title: "Agent Travel Alert",
      message: `${travelData.agentName} is traveling from ${travelData.from} to ${travelData.to} on ${travelData.date} at ${travelData.departureTime}`,
      time: "Just now",
      read: false,
      travelId: travelData.id,
    }

    // Add to notification system (this would be handled by a global state or API)
    console.log("Sending notification:", notification)
  }

  const handleSubscribe = (travelId) => {
    setTravelAnnouncements((prev) =>
      prev.map((travel) => (travel.id === travelId ? { ...travel, subscribers: travel.subscribers + 1 } : travel)),
    )
    alert("आपको इस travel के लिए notifications मिलेंगे!")
  }

  return (
    <div className="agent-travel-container">
      <div className="travel-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Agent Travel System</h1>
            <p>अपनी travel announce करें और users को notify करें</p>
          </div>
          <div className="header-stats">
            <div className="stat-cards">
              <div className="stat-icon">🚗</div>
              <div>
                <div className="stat-number">24</div>
                <div className="stat-label">Active Travels</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div>
                <div className="stat-number">156</div>
                <div className="stat-label">Total Subscribers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="travel-tabs">
        <button
          className={`tab-button ${activeTab === "announce-travel" ? "active" : ""}`}
          onClick={() => setActiveTab("announce-travel")}
        >
          <span className="tab-icon">➕</span>
          Announce Travel
        </button>
        <button
          className={`tab-button ${activeTab === "all-travels" ? "active" : ""}`}
          onClick={() => setActiveTab("all-travels")}
        >
          <span className="tab-icon">📍</span>
          All Travels
        </button>
        <button
          className={`tab-button ${activeTab === "my-travels" ? "active" : ""}`}
          onClick={() => setActiveTab("my-travels")}
        >
          <span className="tab-icon">🚗</span>
          My Travels
        </button>
      </div>

      <div className="travel-content">
        {activeTab === "announce-travel" && (
          <div className="announce-card">
            <div className="card-header">
              <h2>नई Travel Announce करें</h2>
            </div>
            <div className="card-content">
              <form onSubmit={handleSubmitTravel} className="travel-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>From (कहाँ से)</label>
                    <select
                      value={newTravel.from}
                      onChange={(e) => setNewTravel({ ...newTravel, from: e.target.value })}
                      required
                    >
                      <option value="">Select location</option>
                      {locations.map((loc) => (
                        <option key={loc.value} value={loc.label}>
                          {loc.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>To (कहाँ जा रहे हैं)</label>
                    <select
                      value={newTravel.to}
                      onChange={(e) => setNewTravel({ ...newTravel, to: e.target.value })}
                      required
                    >
                      <option value="">Select destination</option>
                      {locations.map((loc) => (
                        <option key={loc.value} value={loc.label}>
                          {loc.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      className="inp"
                      value={newTravel.date}
                      onChange={(e) => setNewTravel({ ...newTravel, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Departure Time</label>
                    <input
                      type="time"
                      className="inp"
                      value={newTravel.departureTime}
                      onChange={(e) => setNewTravel({ ...newTravel, departureTime: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Vehicle Type</label>
                    <select
                      value={newTravel.vehicleType}
                      onChange={(e) => setNewTravel({ ...newTravel, vehicleType: e.target.value })}
                      required
                    >
                      <option value="">Select vehicle</option>
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="Car">Car</option>
                      <option value="Auto">Auto Rickshaw</option>
                      <option value="Bicycle">Bicycle</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Available Slots</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="inp"
                      value={newTravel.availableSlots}
                      onChange={(e) => setNewTravel({ ...newTravel, availableSlots: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Services Available</label>
                  <div className="service-checkboxes">
                    {serviceOptions.map((service) => (
                      <label key={service} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={newTravel.services.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Fare per Service</label>
                  <input
                    type="text"
                    className="inp"
                    placeholder="e.g., ₹50 per service"
                    value={newTravel.fare}
                    onChange={(e) => setNewTravel({ ...newTravel, fare: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="submit-button">
                  <span className="button-icon">➕</span>
                  Announce Travel
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "all-travels" && (
          <div className="travels-grid">
            {travelAnnouncements.map((travel) => (
              <div key={travel.id} className="travel-card">
                <div className="travel-card-content">
                  <div className="travel-header-info">
                    <div className="agent-info">
                      <h3>{travel.agentName}</h3>
                      <span className="status-badge active">{travel.status}</span>
                    </div>
                    <div className="vehicle-info">
                      <span className="vehicle-icon">🚗</span>
                      <span>{travel.vehicleType}</span>
                    </div>
                  </div>

                  <div className="route-info">
                    <div className="route">
                      <span className="route-icon from">📍</span>
                      <span className="location">{travel.from}</span>
                      <div className="route-line"></div>
                      <span className="route-icon to">📍</span>
                      <span className="location">{travel.to}</span>
                    </div>
                  </div>

                  <div className="travel-details">
                    <div className="detail-item">
                      <span className="detail-icon">🕐</span>
                      <span>
                        {travel.date} at {travel.departureTime}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">👥</span>
                      <span>{travel.availableSlots} slots available</span>
                    </div>
                  </div>

                  <div className="services-list">
                    <h4>Available Services:</h4>
                    <div className="services-tags">
                      {travel.services.map((service, index) => (
                        <span key={index} className="service-tag">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="travel-footer">
                    <div className="fare-info">
                      <span className="fare">{travel.fare}</span>
                    </div>
                    <div className="travel-actions">
                      <div className="subscribers-count">
                        <span className="bell-icon">🔔</span>
                        <span>{travel.subscribers} subscribers</span>
                      </div>
                      <button className="subscribe-button" onClick={() => handleSubscribe(travel.id)}>
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "my-travels" && (
          <div className="my-travels-list">
            {myTravels.map((travel) => (
              <div key={travel.id} className="my-travel-card">
                <div className="my-travel-content">
                  <div className="my-travel-header">
                    <div className="travel-route">
                      <h3>
                        {travel.from} → {travel.to}
                      </h3>
                      <span className="status-badge active">{travel.status}</span>
                    </div>
                    <div className="travel-time">
                      <span className="time-icon">🕐</span>
                      <span>
                        {travel.date} at {travel.departureTime}
                      </span>
                    </div>
                  </div>

                  <div className="my-travel-stats">
                    <div className="stat-item">
                      <span className="stat-icon">🔔</span>
                      <div>
                        <div className="stat-number">{travel.subscribers}</div>
                        <div className="stat-label">Subscribers</div>
                      </div>
                    </div>
                    <div className="stat-item">
                      <span className="stat-icon">✅</span>
                      <div>
                        <div className="stat-number">{travel.bookings}</div>
                        <div className="stat-label">Bookings</div>
                      </div>
                    </div>
                  </div>

                  <div className="my-travel-actions">
                    <button className="action-button edit">Edit Travel</button>
                    <button className="action-button view">View Bookings</button>
                    <button className="action-button cancel">Cancel Travel</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
