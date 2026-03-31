"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react"
import "../css/ContactPage.css"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("Contact form submitted:", formData)
      alert("Message sent successfully! हम जल्दी आपसे संपर्क करेंगे।")

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
        type: "general",
      })
    } catch (error) {
      console.error("Contact form error:", error)
      alert("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Phone className="contact-info-icon" />,
      title: "Phone Support",
      details: ["+91 98765 43210", "+91 87654 32109"],
      description: "24/7 customer support available",
    },
    {
      icon: <Mail className="contact-info-icon" />,
      title: "Email Support",
      details: ["help@biharseva.com", "support@biharseva.com"],
      description: "We'll respond within 24 hours",
    },
    {
      icon: <MapPin className="contact-info-icon" />,
      title: "Office Address",
      details: ["Main Road, Darbhanga", "Bihar - 846004"],
      description: "Visit us during office hours",
    },
    {
      icon: <Clock className="contact-info-icon" />,
      title: "Office Hours",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
      description: "Emergency support available 24/7",
    },
  ]

  const faqItems = [
    {
      question: "How do I book a service?",
      answer: "आप हमारी website पर जाकर service select कर सकते हैं या direct call कर सकते हैं।",
    },
    {
      question: "What are the service charges?",
      answer: "Service charges vary by type. Medicine delivery ₹50+, Document work ₹100-300, etc.",
    },
    {
      question: "How do I track my request?",
      answer: "आप अपने dashboard में जाकर real-time status देख सकते हैं।",
    },
    {
      question: "What if I'm not satisfied?",
      answer: "हमारी 100% satisfaction guarantee है। Problem होने पर full refund मिलेगा।",
    },
  ]

  return (
    <div className="contact-page">
      {/* Header */}
      <div className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>हमसे जुड़ें - आपकी हर समस्या का समाधान</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          {/* Contact Info Cards */}
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="contact-info-header">
                  {info.icon}
                  <h3>{info.title}</h3>
                </div>
                <div className="contact-info-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="contact-detail">
                      {detail}
                    </p>
                  ))}
                  <p className="contact-description">{info.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form & Quick Actions */}
          <div className="contact-main">
            <div className="contact-form-section">
              <div className="form-header">
                <h2>Send us a Message</h2>
                <p>अपनी समस्या या सुझाव हमें भेजें</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      className="inp"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="आपका नाम"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      className="inp"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Mobile number"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="inp"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Message Type *</label>
                    <select name="type" value={formData.type} onChange={handleChange} required>
                      <option value="general">General Inquiry</option>
                      <option value="complaint">Complaint</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing Question</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      className="inp"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Message subject"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="अपना message detail में लिखें..."
                    rows={5}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  <Send className="send-icon" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>

              <div className="action-buttons">
                <a href="tel:+919876543210" className="action-btn call">
                  <Phone className="action-icon" />
                  <div>
                    <strong>Call Now</strong>
                    <span>Instant support</span>
                  </div>
                </a>

                <a href="https://wa.me/919876543210" className="action-btn whatsapp">
                  <MessageCircle className="action-icon" />
                  <div>
                    <strong>WhatsApp</strong>
                    <span>Chat with us</span>
                  </div>
                </a>

                
              </div>

              <div className="faq-section">
                <h4>Frequently Asked Questions</h4>
                <div className="faq-list">
                  {faqItems.map((faq, index) => (
                    <details key={index} className="faq-item">
                      <summary>{faq.question}</summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
