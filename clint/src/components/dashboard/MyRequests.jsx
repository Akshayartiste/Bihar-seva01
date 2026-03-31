"use client"

import { useState } from "react"
import { Clock, User, Star, MapPin, Phone } from "lucide-react"
import "../css/MyRequest.css"

export default function MyRequests({ requests: initialRequests }) {
  const [requests, setRequests] = useState(initialRequests || [])
  const [filter, setFilter] = useState("all")

  // TODO: Backend connection - Fetch user's requests
  // GET /api/requests/user/:userId
  // Response: { requests: [...] }

  const statusColors = {
    "In Progress": { bg: "#fef3c7", text: "#d97706", border: "#f59e0b" },
    Completed: { bg: "#d1fae5", text: "#059669", border: "#10b981" },
    Pending: { bg: "#dbeafe", text: "#2563eb", border: "#3b82f6" },
    Cancelled: { bg: "#fee2e2", text: "#dc2626", border: "#ef4444" },
  }

  const filteredRequests = requests.filter((request) => {
    if (filter === "all") return true
    return request.status.toLowerCase().replace(" ", "-") === filter
  })

  const handleRateAgent = (requestId) => {
    // TODO: Backend connection - Submit rating
    // POST /api/requests/:requestId/rate
    // Body: { rating, review }
    alert("Rating feature will be implemented!")
  }

  const handleContactAgent = (requestId) => {
    // TODO: Backend connection - Get agent contact
    // GET /api/requests/:requestId/agent-contact
    alert("Agent contact feature will be implemented!")
  }

  const handleCancelRequest = (requestId) => {
    // TODO: Backend connection - Cancel request
    // PUT /api/requests/:requestId/cancel
    if (confirm("Are you sure you want to cancel this request?")) {
      setRequests(requests.map((req) => (req.id === requestId ? { ...req, status: "Cancelled" } : req)))
    }
  }

  return (
    <div className="my-requests">
      <div className="page-header">
        <h1>My Requests</h1>
        <p>आपकी सभी service requests की जानकारी</p>
      </div>

      <div className="requests-filters">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          All ({requests.length})
        </button>
        <button className={`filter-btn ${filter === "pending" ? "active" : ""}`} onClick={() => setFilter("pending")}>
          Pending ({requests.filter((r) => r.status === "Pending").length})
        </button>
        <button
          className={`filter-btn ${filter === "in-progress" ? "active" : ""}`}
          onClick={() => setFilter("in-progress")}
        >
          In Progress ({requests.filter((r) => r.status === "In Progress").length})
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed ({requests.filter((r) => r.status === "Completed").length})
        </button>
      </div>

      <div className="requests-list">
        {filteredRequests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No requests found</h3>
            <p>
              {filter === "all"
                ? "आपने अभी तक कोई service request नहीं की है।"
                : `No ${filter.replace("-", " ")} requests found.`}
            </p>
            <a href="#" className="btn btn-primary">
              Create New Request
            </a>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-header">
                <div className="request-info">
                  <h3>{request.service}</h3>
                  <div
                    className="status-badge"
                    style={{
                      backgroundColor: statusColors[request.status]?.bg,
                      color: statusColors[request.status]?.text,
                      borderColor: statusColors[request.status]?.border,
                    }}
                  >
                    {request.status}
                  </div>
                </div>
                <div className="request-amount">{request.amount}</div>
              </div>

              <div className="request-details">
                <div className="detail-item">
                  <User className="detail-icon" />
                  <span>Agent: {request.agent}</span>
                </div>
                <div className="detail-item">
                  <Clock className="detail-icon" />
                  <span>Date: {request.date}</span>
                </div>
                {request.location && (
                  <div className="detail-item">
                    <MapPin className="detail-icon" />
                    <span>Location: {request.location}</span>
                  </div>
                )}
              </div>

              {request.status === "Completed" && request.rating && (
                <div className="rating-display">
                  <Star className="star-icon filled" />
                  <span>Rating: {request.rating}/5</span>
                </div>
              )}

              <div className="request-actions">
                {request.status === "In Progress" && (
                  <>
                    <button className="btn btn-outline" onClick={() => handleContactAgent(request.id)}>
                      <Phone className="btn-icon" />
                      Contact Agent
                    </button>
                    <button className="btn btn-danger" onClick={() => handleCancelRequest(request.id)}>
                      Cancel Request
                    </button>
                  </>
                )}

                {request.status === "Completed" && !request.rating && (
                  <button className="btn btn-primary" onClick={() => handleRateAgent(request.id)}>
                    <Star className="btn-icon" />
                    Rate Agent
                  </button>
                )}

                {request.status === "Pending" && (
                  <button className="btn btn-danger" onClick={() => handleCancelRequest(request.id)}>
                    Cancel Request
                  </button>
                )}

                <button className="btn btn-outline">View Details</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
