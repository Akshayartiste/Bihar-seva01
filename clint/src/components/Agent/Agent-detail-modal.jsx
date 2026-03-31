"use client"

import { X, Star, MapPin, Clock, Users } from "lucide-react"
import { Button } from "../ui/Button"
import "../css/Agent-detail-modal.css"

const SERVICE_DETAILS = {
  "Medicine Delivery":
    "Fast and reliable medicine delivery to your doorstep with authenticated pharmacies",
  "Document Work":
    "Handle government documents, photocopying, and official paperwork",
  Shopping: "Shop for groceries, household items, and personal needs",
  Banking: "Assist with bank-related work, deposits, withdrawals, and inquiries",
  Tickets: "Book travel tickets, movie tickets, and event passes",
  Recharge: "Mobile, DTH, and utility bill recharge services",
}

export function AgentDetailModal({ agent, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="agent-modal-overlay" onClick={onClose}>
      <div
        className="agent-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X className="close-icon" />
        </button>

        <div className="modal-header">
          <img
            src={agent.image || "/placeholder.svg"}
            alt={agent.name}
            className="modal-agent-image"
          />
          <div className="modal-header-content">
            <h2 className="modal-agent-name">{agent.name}</h2>
            <div className="modal-rating">
              <Star className="star-filled" />
              <span className="rating-text">
                {agent.rating} ({agent.reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="modal-section">
          <h3 className="section-title">Service Area & Timing</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <MapPin className="detail-icon" />
              <div>
                <p className="detail-label">Location</p>
                <p className="detail-value">{agent.location}</p>
              </div>
            </div>

            <div className="detail-item">
              <Clock className="detail-icon" />
              <div>
                <p className="detail-label">Service Area</p>
                <p className="detail-value">{agent.serviceArea}</p>
              </div>
            </div>

            <div className="detail-item">
              <Clock className="detail-icon" />
              <div>
                <p className="detail-label">Arrival Time</p>
                <p className="detail-value">{agent.arrivalTime}</p>
              </div>
            </div>

            <div className="detail-item">
              <Users className="detail-icon" />
              <div>
                <p className="detail-label">Available Slots</p>
                <p className="detail-value">
                  {agent.availableSlots} remaining
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-section">
          <h3 className="section-title">Services Offered</h3>
          <div className="services-list">
            {agent.services.map((service) => (
              <div key={service} className="service-item">
                <div className="service-name">{service}</div>
                <p className="service-description">
                  {SERVICE_DETAILS[service]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <div className="price-info">
            <span className="price-label">Price Range</span>
            <span className="price-value">{agent.price}</span>
          </div>
          <Button
            className="book-modal-btn"
            onClick={() => {
              alert(`Booked ${agent.name}!`)
              onClose()
            }}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}
