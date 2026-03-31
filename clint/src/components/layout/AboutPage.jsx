"use client"

import { MapPin, Users, Award, Target, Heart, Shield, Star, TrendingUp } from 'lucide-react'
import "../css/AboutPage.css"

export default function AboutPage() {
  const stats = [
    { number: "800+", label: "Happy Customers", icon: <Users />, color: "blue" },
    { number: "150+", label: "Trusted Agents", icon: <Shield />, color: "green" },
    { number: "25+", label: "Villages Connected", icon: <MapPin />, color: "purple" },
    { number: "96%", label: "Success Rate", icon: <Award />, color: "orange" },
  ]

  const team = [
    {
      name: "राजेश कुमार सिंह",
      role: "Founder & CEO",
      image: "👨‍💼",
      description: "10+ years experience in rural development और technology innovation में expertise",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "प्रिया शर्मा",
      role: "Co-Founder & COO",
      image: "👩‍💼", 
      description: "Operations और service management में expert, rural Bihar की deep understanding",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "अमित कुमार यादव",
      role: "Co-Founder & CTO",
      image: "👨‍💻",
      description: "Technology solutions और mobile app development में 8+ years का experience",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "सुनीता देवी",
      role: "Co-Founder & Head of Community",
      image: "👩‍🎓",
      description: "Community engagement और local partnerships में specialist, social work background",
      linkedin: "#",
      twitter: "#",
    },
  ]

  const values = [
    {
      icon: <Heart className="value-icon" />,
      title: "Community First",
      description: "हमारा मुख्य उद्देश्य community की service करना है। हर decision में community का benefit सबसे पहले आता है।",
      color: "red",
    },
    {
      icon: <Shield className="value-icon" />,
      title: "Trust & Reliability", 
      description: "भरोसा और विश्वसनीयता हमारी foundation है। हम हर promise को पूरा करने में believe करते हैं।",
      color: "blue",
    },
    {
      icon: <Target className="value-icon" />,
      title: "Quality Excellence",
      description: "हर service में quality और excellence maintain करना हमारी priority है। No compromise on quality।",
      color: "green",
    },
  ]

  const achievements = [
    {
      icon: <Star className="achievement-icon" />,
      title: "Best Rural Service Platform 2024",
      description: "Bihar Innovation Awards में recognition",
    },
    {
      icon: <TrendingUp className="achievement-icon" />,
      title: "Fastest Growing Startup",
      description: "Rural tech category में top performer",
    },
    {
      icon: <Users className="achievement-icon" />,
      title: "Community Choice Award",
      description: "Local communities द्वारा voted",
    },
  ]

  return (
    <div className="about-page">
      {/* Enhanced Hero Section */}
      <div className="about-hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="floating-elements">
            <div className="floating-element element-1">🏘️</div>
            <div className="floating-element element-2">🚀</div>
            <div className="floating-element element-3">💫</div>
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <MapPin className="badge-icon" />
              <span>Serving Rural Bihar Since 2024</span>
            </div>
            <h1>About BiharSeva</h1>
            <p>गांव से शहर तक - आपकी हर जरूरत का भरोसेमंद साथी</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="st-number">800+</span>
                <span className="sts-label" >Customers</span>
              </div>
              <div className="hero-stat">
                <span className="st-number">25+</span>
                <span className="sts-label" >Villages</span>
              </div>
              <div className="hero-stat">
                <span className="st-number">96%</span>
                <span className="sts-label">Success</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Enhanced Mission Section */}
        <section className="mission-section">
          <div className="section-header">
            <div className="section-badge">Our Mission</div>
            <h2>Bridging the Gap Between Villages and Cities</h2>
          </div>
          <div className="mission-content">
            <div className="mission-text">
              <div className="mission-card">
                <div className="mission-icon">🎯</div>
                <h3>Our Purpose</h3>
                <p>
                  BiharSeva का mission है rural Bihar के लोगों को city services तक आसान पहुंच प्रदान करना। हम technology का
                  उपयोग करके traditional barriers को तोड़ते हैं और local agents के network के through reliable services provide
                  करते हैं।
                </p>
              </div>
              <div className="mission-card">
                <div className="mission-icon">🌟</div>
                <h3>Our Vision</h3>
                <p>
                  हमारा vision है कि हर village का व्यक्ति बिना शहर गए अपनी सभी जरूरतें पूरी कर सके। चाहे वो medicine हो, documents
                  का काम हो, या कोई और service - हम सब कुछ आपके doorstep पर पहुंचाते हैं।
                </p>
              </div>
            </div>
            <div className="mission-visual">
              <div className="visual-card">
                <div className="visual-content">
                  <div className="village-icon">🏘️</div>
                  <div className="connection-line"></div>
                  <div className="city-icon">🏙️</div>
                </div>
                <p>Connecting Rural Bihar with Urban Services</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section className="stats-section">
          <div className="section-header">
            <div className="section-badge">Our Impact</div>
            <h2>Numbers That Tell Our Story</h2>
          </div>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`st-card ${stat.color}`}>
                <div className="stat-background"></div>
                <div className="st-icon">{stat.icon}</div>
                <div className="st-numbers" style={{ color: '#08ffad' }}>{stat.number}</div>
                <div className="st-label">{stat.label}</div>
                <div className="st-growth" style={{ color: '#08ffad' }}>+15% this month</div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Story Section */}
        <section className="story-section">
          <div className="section-header">
            <div className="section-badge">Our Journey</div>
            <h2>The Story Behind BiharSeva</h2>
          </div>
          <div className="story-content">
            <div className="story-timeline">
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-year">Jan 2025</div>
                </div>
                <div className="timeline-content">
                  <h3>🚀 BiharSeva की शुरुआत</h3>
                  <p>Darbhanga और Madhubani में pilot project के रूप में service शुरू की गई। पहले 50 customers के साथ journey begin हुई।</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-year">Mar 2025</div>
                </div>
                <div className="timeline-content">
                  <h3>👥 Agent Network Expansion</h3>
                  <p>150+ verified agents को network में शामिल किया। Complete background verification और training program launch किया।</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-year">May 2025</div>
                </div>
                <div className="timeline-content">
                  <h3>📱 Mobile App Launch</h3>
                  <p>User-friendly mobile application launch की गई। Real-time tracking और notification features add किए।</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-year">Dec 2025</div>
                </div>
                <div className="timeline-content">
                  <h3>🏆 Recognition & Awards</h3>
                  <p>Bihar Innovation Awards में recognition मिली। 800+ satisfied customers का milestone achieve किया।</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Values Section */}
        <section className="values-section">
          <div className="section-header">
            <div className="section-badge">Our Values</div>
            <h2>What Drives Us Every Day</h2>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className={`value-card ${value.color}`}>
                <div className="value-header">
                  <div className="value-icon-wrapper">
                    {value.icon}
                  </div>
                  <h3>{value.title}</h3>
                </div>
                <p>{value.description}</p>
                <div className="value-decoration"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="achievements-section">
          <div className="section-header">
            <div className="section-badge">Recognition</div>
            <h2>Our Achievements</h2>
          </div>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <div className="achievement-icon-wrapper">
                  {achievement.icon}
                </div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Team Section */}
        <section className="team-section">
          <div className="section-header">
            <div className="section-badge">Our Team</div>
            <h2>Meet the Founders</h2>
            <p>Passionate individuals working to transform rural Bihar</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-card-inner">
                  <div className="team-front">
                    <div className="team-avatar">{member.image}</div>
                    <h3>{member.name}</h3>
                    <div className="team-role">{member.role}</div>
                    <p>{member.description}</p>
                  </div>
                  <div className="team-back">
                    <div className="team-social">
                      <a href={member.linkedin} className="social-link linkedin">
                        💼 LinkedIn
                      </a>
                      <a href={member.twitter} className="social-link twitter">
                        🐦 Twitter
                      </a>
                    </div>
                    <div className="team-quote">
                      "Building technology for rural empowerment"
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="ct-section">
          <div className="ct-background">
            <div className="cta-pattern"></div>
          </div>
          <div className="cta-content">
            <div className="cta-icon">🚀</div>
            <h2>Ready to Experience BiharSeva?</h2>
            <p>Join thousands of satisfied customers और अपनी जरूरतों का आसान समाधान पाएं</p>
            <div className="cta-buttons">
              <a href="/signup" className="cta-btn primary">
                <span>Get Started</span>
                <div className="btn-shine"></div>
              </a>
              <a href="/contact" className="cta-btn secondary">
                <span>Contact Us</span>
                <div className="btn-shine"></div>
              </a>
            </div>
            <div className="cta-features">
              <div className="cta-feature">
                <span className="feature-icon">✅</span>
                <span>Free Registration</span>
              </div>
              <div className="cta-feature">
                <span className="feature-icon">⚡</span>
                <span>Instant Service</span>
              </div>
              <div className="cta-feature">
                <span className="feature-icon">🛡️</span>
                <span>100% Secure</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
