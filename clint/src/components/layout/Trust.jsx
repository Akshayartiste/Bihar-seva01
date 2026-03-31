"use client"
import { Link } from "react-router-dom"
import { Shield, Star, Clock, Phone, Award, Users } from "lucide-react"
import "../css/Trust.css"

// Import JSON data at the top
import testimonialsData from "../data/testimonials.json"

export default function Trust() {
  const trustFeatures = [
    {
      icon: <Shield className="trust-icon" />,
      title: "Verified Agents",
      description: "सभी agents का complete background verification और police verification होता है",
      color: "green",
    },
    {
      icon: <Star className="trust-icon" />,
      title: "Quality Guarantee",
      description: "हर service की quality guarantee के साथ money-back policy",
      color: "yellow",
    },
    {
      icon: <Clock className="trust-icon" />,
      title: "On-Time Delivery",
      description: "समय पर service delivery की 100% guarantee या फिर free service",
      color: "blue",
    },
    {
      icon: <Phone className="trust-icon" />,
      title: "24/7 Support",
      description: "किसी भी समस्या के लिए 24/7 customer support available",
      color: "purple",
    },
    {
      icon: <Award className="trust-icon" />,
      title: "Licensed Service",
      description: "Government registered और licensed service provider",
      color: "red",
    },
    {
      icon: <Users className="trust-icon" />,
      title: "Community Trust",
      description: "Local community के trusted members हैं हमारे agents",
      color: "indigo",
    },
  ]

  // Replace the hardcoded testimonials array with:
  const testimonials = testimonialsData.testimonials

  return (
    <section className="trust">
      <div className="container">
        <div className="trust-header">
          <h2>क्यों भरोसा करें BiharSeva पर?</h2>
          <p>हमारी commitment आपकी satisfaction के लिए</p>
        </div>

        <div className="trust-features">
          {trustFeatures.map((feature, index) => (
            <div key={index} className={`trust-card ${feature.color}`}>
              <div className="trust-card-header">
                {feature.icon}
                <h3>{feature.title}</h3>
              </div>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="testimonials-section">
          <h3>हमारे Customers क्या कहते हैं</h3>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="customer-avatar">{testimonial.image}</div>
                  <div className="customer-info">
                    <h4>{testimonial.name}</h4>
                    <p>
                      {testimonial.location} • {testimonial.service}
                    </p>
                  </div>
                  <div className="rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="star filled" />
                    ))}
                  </div>
                </div>
                <div className="testimonial-content">
                  <p>"{testimonial.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="trust-cta">
          <div className="cta-content">
            <h3>अभी भी doubt है?</h3>
            <p>हमसे बात करें और अपने सवाल पूछें</p>
            <div className="cta-buttons">
              <a href="tel:+919876543210" className="btn btnnn-primary">
                <Phone className="btn-icon" />
                Call करें
              </a>
              <Link to="/services" className="btn btttn-outline">
                Service Book करें
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
