"use client"

import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"
import { Link } from "react-router-dom"
import "../css/Footer.css"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "Services", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Contact", href: "#contact" },
  ]

  const services = [
    "Medicine Delivery",
    "Document Work",
    "Shopping Service",
    "Bank Work",
    "Mobile Recharge",
    "Ticket Booking",
  ]

  const locations = ["Darbhanga City", "Madhubani City", "Laheriasarai", "Jhanjharpur", "Keoti", "Phulparas"]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <MapPin className="logo-icon" />
              <h3>BiharSeva</h3>
            </div>
            <p className="footer-description">
              Darbhanga और Madhubani को शहर से जोड़ने वाला trusted service platform। आपकी हर जरूरत के लिए reliable agents।
            </p>
            <div className="social-links">
              <a href="#" className="social-link facebook">
                <Facebook />
              </a>
              <a href="#" className="social-link instagram">
                <Instagram />
              </a>
              <a href="#" className="social-link twitter">
                <Twitter />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
              <Link to="/" className="main-link">Home</Link></li>
               <li><Link to="/services" className="main-link">Services</Link></li>
               <li><Link to="/contact" className="main-link">Contact</Link></li>
               <li><Link to="/about" className="main-link">About us</Link></li>
              
            </ul>
          </div>

          <div className="footer-section">
            <h4>Our Services</h4>
            <ul className="footer-links">
              {services.map((service, index) => (
                <li key={index}>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Service Areas</h4>
            <ul className="footer-links">
              {locations.map((location, index) => (
                <li key={index}>
                  <span>{location}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <div>
                  <p>Customer Support</p>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <div>
                  <p>Email Support</p>
                  <a href="mailto:help@biharseva.com">help@biharseva.com</a>
                </div>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <p>Office</p>
                  <span>Darbhanga, Bihar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} BiharSeva. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms & Conditions</a>
              <a href="/refund">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
