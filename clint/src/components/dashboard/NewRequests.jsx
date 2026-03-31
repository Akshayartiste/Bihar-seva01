"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Clock, DollarSign } from "lucide-react"
import "../css/NewRequest.css"

// Import JSON data at the top
import servicesData from "../data/services.json"
import locationsData from "../data/locations.json"

export default function NewRequest() {
  const [formData, setFormData] = useState({
    service: "",
    description: "",
    pickupLocation: "",
    deliveryLocation: "",
    preferredDate: "",
    preferredTime: "",
    budget: "",
    urgency: "normal",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Replace the hardcoded services array with:
  const services = servicesData.services.map((service) => ({
    value: service.id,
    label: service.title,
    price: service.price,
    time: service.time,
  }))

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Backend connection - Submit new service request
    // POST /api/requests/create
    // Body: formData
    // Response: { success, requestId, message }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("New request submitted:", formData)
      alert("Request submitted successfully! हमारा agent आपसे जल्दी संपर्क करेगा।")

      // Reset form
      setFormData({
        service: "",
        description: "",
        pickupLocation: "",
        deliveryLocation: "",
        preferredDate: "",
        preferredTime: "",
        budget: "",
        urgency: "normal",
      })
    } catch (error) {
      alert("Error submitting request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
 const navigate = useNavigate() // ✅ hook ke andar define kare
const viewAgent = (e) => {
  e.preventDefault()       // default form submit stop
  navigate("/book-agent")  // navigate to book-agent route
}

  const selectedService = services.find((s) => s.value === formData.service)

  return (
    <div className="new-request">
      <div className="page-header">
        <h1>New Service Request</h1>
        <p>अपनी जरूरत के अनुसार service book करें</p>
      </div>

      <div className="request-container">
        <div className="request-form-section">
          <div className="form-card">
            <h2>Service Details</h2>
            <form onSubmit={handleSubmit} className="request-form">
              <div className="form-group">
                <label>Service Type *</label>
                <select name="service" value={formData.service} onChange={handleChange} required>
                  <option value="">Select service type</option>
                  {services.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedService && (
                <div className="service-info">
                  <div className="service-detail">
                    <DollarSign className="detail-icon" />
                    <span>Price: {selectedService.price}</span>
                  </div>
                  <div className="service-detail">
                    <Clock className="detail-icon" />
                    <span>Time: {selectedService.time}</span>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="अपनी जरूरत को detail में बताएं..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Pickup Location *</label>
                  <select name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} required>
                    <option value="">Select location</option>
                    {locationsData.districts.map((district) => (
                      <optgroup key={district.id} label={district.name}>
                        {district.villages.map((village) => (
                          <option key={village.id} value={village.id}>
                            {village.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Delivery Location</label>
                  <input
                    type="text"
                    className="inp"
                    name="deliveryLocation"
                    value={formData.deliveryLocation}
                    onChange={handleChange}
                    placeholder="Where to deliver (optional)"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input
                    type="date"
                    className="inp"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Preferred Time *</label>
                  <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} required>
                    <option value="">Select time</option>
                    {locationsData.timeSlots.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Budget Range</label>
                  <select name="budget" value={formData.budget} onChange={handleChange}>
                    <option value="">Select budget (optional)</option>
                    {locationsData.budgetRanges.map((range) => (
                      <option key={range.id} value={range.id}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Urgency Level</label>
                  <select name="urgency" value={formData.urgency} onChange={handleChange}>
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent (+₹50)</option>
                    <option value="emergency">Emergency (+₹100)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
              <button type="button" className="submit-button" onClick={viewAgent} >View Available Agent </button>
            </form>
          </div>
        </div>

        <div className="request-info-section">
          <div className="info-card">
            <h3>How it works</h3>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Submit Request</h4>
                  <p>Fill the form with your requirements</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Agent Assignment</h4>
                  <p>We'll assign a verified agent</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Service Completion</h4>
                  <p>Agent completes your work</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Payment</h4>
                  <p>Pay after work completion</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Need Help?</h3>
            <p>हमारी customer support team आपकी मदद के लिए हमेशा तैयार है।</p>
            <div className="contact-options">
              <a href="tel:+919876543210" className="contact-button">
                📞 Call Support
              </a>
              <a href="https://wa.me/919876543210" className="contact-button">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
