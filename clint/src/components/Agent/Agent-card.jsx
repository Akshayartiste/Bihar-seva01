"use client"

import { useState } from "react"
import { Star, MapPin, Clock, Split as Slot } from "lucide-react"
import { Button } from "../ui/Button"
import { AgentDetailModal } from "./Agent-detail-modal"
import "../css/Agent-card.css"

const SERVICE_ICONS = {
  "Medicine Delivery": "💊",
  "Document Work": "📄",
  Shopping: "🛍️",
  Banking: "🏦",
  Tickets: "🎫",
  Recharge: "📱",
}

export function AgentCard({ agent }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="agent-card">
        <div className="agent-card-header">
          <div className="agent-image-wrapper">
            <img
              src={agent.image || "/placeholder.svg"}
              alt={agent.name}
              className="agent-image"
            />
            <div className="agent-rating">
              <Star className="agent-star-icon" />
              <span className="agent-rating-value">{agent.rating}</span>
            </div>
          </div>
        </div>

        <div className="agent-card-content">
          <h3 className="agent-name">{agent.name}</h3>

          <div className="agent-location">
            <MapPin className="location-icon" />
            <span>{agent.location}</span>
          </div>

          <div className="agent-meta">
            <div className="meta-item">
              <Clock className="meta-icon" />
              <span>{agent.arrivalTime}</span>
            </div>
            <div className="meta-item">
              <Slot className="meta-icon" />
              <span>{agent.availableSlots} slots</span>
            </div>
          </div>

          <div className="agent-services">
            {agent.services.map((service) => (
              <span key={service} className="service-badge">
                {SERVICE_ICONS[service] || "•"} {service}
              </span>
            ))}
          </div>

          <div className="agent-footer">
            <div className="agent-price">{agent.price}</div>
            <div className="agent-actions">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="view-more-btn"
              >
                View More
              </Button>
              <Button size="sm" className="book-btn">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AgentDetailModal
        agent={agent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
