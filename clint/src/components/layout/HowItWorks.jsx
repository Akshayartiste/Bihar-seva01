"use client"
import { Link } from "react-router-dom"
import "../css/HowItWorks.css"

export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Request करें",
      description: "Website या phone पर अपनी जरूरत बताएं",
      icon: "📱",
      details: "Simple form भरें या call करें",
    },
    {
      step: "2",
      title: "Agent मिलेगा",
      description: "आपके area का verified agent assign होगा",
      icon: "👨‍💼",
      details: "5 minutes में confirmation",
    },
    {
      step: "3",
      title: "काम होगा",
      description: "Agent आपका काम पूरा करेगा",
      icon: "✅",
      details: "Real-time updates मिलेंगे",
    },
    {
      step: "4",
      title: "Payment करें",
      description: "काम पूरा होने पर payment करें",
      icon: "💳",
      details: "Cash या online दोनों option",
    },
  ]

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>कैसे काम करता है?</h2>
          <p>सिर्फ 4 आसान steps में आपका काम हो जाएगा</p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.step} className="step-card">
              <div className="step-number">{step.step}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              <div className="step-details">{step.details}</div>

              {index < steps.length - 1 && (
                <div className="step-connector">
                  <div className="connector-line"></div>
                  {/* <div className="connector-arrow">→</div> */}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="cta-section">
          <h3>Ready to start?</h3>
          <p>अभी service book करें और experience करें</p>
          <Link to="/services" className="btn btn-primary btn-large">
            Service Book करें
            
          </Link>
        </div>
      </div>
    </section>
  )
}
