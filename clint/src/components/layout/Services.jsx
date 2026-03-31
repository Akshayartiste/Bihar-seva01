"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../css/Services.css"

// Import JSON data at the top
import servicesData from "../data/services.json"

export default function Services() {
  const [selectedService, setSelectedService] = useState(null)

  // Replace the hardcoded services array with:
  const services = servicesData.services

  // Replace the hardcoded categories with:
  const categories = servicesData.categories

  const handleServiceClick = (serviceId) => {
    // TODO: Backend connection - Track service clicks for analytics
    // POST /api/analytics/service-click
    // Body: { serviceId, timestamp, userLocation }
    console.log("Service clicked:", serviceId)
    setSelectedService(serviceId)
  }

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services-header">
          <h2>हमारी Services</h2>
          <p>Darbhanga और Madhubani में available सभी services</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card ${service.popular ? "popular" : ""} ${selectedService === service.id ? "selected" : ""}`}
              onClick={() => handleServiceClick(service.id)}
            >
              {service.popular && <div className="popular-badge">Most Popular</div>}

              <div className="service-icon">{service.icon}</div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>

              <div className="service-meta">
                <div className="service-price">{service.price}</div>
                <div className="service-time">⏱️ {service.time}</div>
              </div>

              <div className="service-features">
                {service.features.map((feature, index) => (
                  <div key={index} className="feature">
                    <span className="feature-dot">•</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/book-agent" className="btn bttn-service">
                Book Now
              </Link>
            </div>
          ))}
        </div>

        {/* <div className="services-footer">
          <Link to="/" className="btn btnn-outline">
            Back to Home
          </Link>
        </div> */}
      </div>
    </section>
  )
}
