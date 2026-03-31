"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, Shield } from "lucide-react"
import "../css/Hero.css"

// Import JSON data at the top
import locationsData from "../data/locations.json"
import servicesData from "../data/services.json"

export default function Hero() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    service: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Backend connection - Send user registration data to API
    // POST /api/users/register
    // Body: { name, phone, village, service }
    console.log("User registration data:", formData)
    alert("Registration successful! हमारा agent आपसे जल्दी संपर्क करेगा।")
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-pattern"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <MapPin className="badge-icon" />
              <span className="dbg-text">Darbhanga & Madhubani में Available</span>
            </div>

            <h1 className="hero-title">
              गांव से शहर तक
              <span className="highlight">आपकी हर जरूरत</span>
              <span className="subtitle">बिहार में</span>
            </h1>

            <p className="hero-description">
              अब Darbhanga और Madhubani से शहर जाने की जरूरत नहीं। हमारे trusted local agents आपके सभी काम करके देंगे - दवाई से लेकर
              कागजी कार्रवाई तक।
            </p>

            <div className="hero-features">
              <div className="feature">
                <Clock className="feature-icon" />
                <span className="feature-text">Same Day Service</span>
              </div>
              <div className="feature">
                <Shield className="feature-icon" />
                <span className="feature-text">Trusted Agents</span>
              </div>
              <div className="feature">
                <Phone className="feature-icon" />
                <span className="feature-text">24/7 Support</span>
              </div>
            </div>
          </div>

          <div className="hero-form">
            <div className="form-container">
              <h3>Service Book करें</h3>
              <p>अपनी जानकारी भरें और service शुरू करें</p>

              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                  {/* <label>आपका नाम</label> */}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="पूरा नाम लिखें"
                    className="your-name"
                    required
                  />
                </div>

                <div className="form-group">
                  {/* <label>मोबाइल नंबर</label> */}
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10 अंकों का नंबर"
                    pattern="[0-9]{10}"
                    className="mob-no"
                    required
                  />
                </div>

                <div className="form-group">
                  <select name="village" value={formData.village} onChange={handleChange} required>
                    <option value="">गांव/इलाका</option>
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
                  {/* <label>कौन सी Service चाहिए?</label> */}
                  <select name="service" value={formData.service} onChange={handleChange} required>
                    <option value="">कौन सी Service चाहिए?</option>
                    {servicesData.services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn bttn-primary btnn-large">
                  Service शुरू करें
                </button>
              </form>

              <div className="form-footer">
                <p>✓ Free Registration</p>
                <p>✓ Instant Agent Assignment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
