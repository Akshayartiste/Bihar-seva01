"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { MapPin, Eye, EyeOff, Phone, Lock, User, Mail } from "lucide-react"
import "../css/signup.css"

// Import JSON data
import locationsData from "../data/locations.json"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    village: "",
    password: "",
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})


  // otp 
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [timer, setTimer] = useState(0)
   
  const handleSendOtp = () => {
  if (!formData.email) {
    setErrors({ ...errors, email: "Enter email first" })
    return
  }

  // Fake OTP send (backend me API call hoga)
  console.log("OTP sent to:", formData.email)

  setOtpSent(true)
  setTimer(30)

  const countdown = setInterval(() => {
    setTimer((prev) => {
      if (prev <= 1) {
        clearInterval(countdown)
        return 0
      }
      return prev - 1
    })
  }, 1000)
}



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.phone) {
      newErrors.phone = "Mobile number is required"
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.village) {
      newErrors.village = "Please select your village/area"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Please agree to terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }



  const navigate = useNavigate()
  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) return

  setIsLoading(true)

  try {
    // 🔥 Backend API call (replace with your API)
    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || "Signup failed")
    }

    console.log("Registration data:", data)

    // 🔥 TOKEN SAVE (important)
    localStorage.setItem("token", data.token)

    alert("Registration successful!")

    // 🔥 REDIRECT
    navigate("/home")

  } catch (error) {
    console.error("Registration error:", error)

    setErrors({ general: error.message || "Registration failed. Please try again." })
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">

          <h1>Create Account</h1>
          <p>नया account बनाएं और services का फायदा उठाएं</p>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          {errors.general && <div className="error-message general-error">{errors.general}</div>}
        


           {/* 🔥 GOOGLE LOGIN BUTTON */}
          <div className="google-login">
            <a href="http://localhost:5000/auth/google">
              <button type="button" className="google-btn">
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="google"
                />
                Continue with Google
              </button>
            </a>
          </div>
           {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

        
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="आपका पूरा नाम"
                  className={errors.name ? "error" : ""}
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Mobile Number *</label>
              <div className="input-wrapper">
                <Phone className="input-icon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 digit number"
                  className={errors.phone ? "error" : ""}
                  maxLength="10"
                />
              </div>
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className={errors.email ? "error" : ""}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          {/* otp  */}
          <div className="otp-section">
  <button
    type="button"
    className="otp-btn"
    onClick={handleSendOtp}
    disabled={timer > 0}
  >
    {timer > 0 ? `Resend OTP in ${timer}s` : "Send OTP"}
  </button>

  {otpSent && (
    <div className="form-group" style={{ marginTop: "10px" }}>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength="6"
        className="otp-input"
      />
    </div>
  )}
</div>

          <div className="form-group">
            <label htmlFor="village">Village/Area *</label>
            <select
              id="village"
              name="village"
              value={formData.village}
              onChange={handleChange}
              className={errors.village ? "error" : ""}
            >
              <option value="">Select your location</option>
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
            {errors.village && <span className="error-message">{errors.village}</span>}
          </div>


          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="least 6 characters"
                className={errors.password ? "error" : ""}
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>



          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
              <span className="checkmark"></span>I agree to the Terms & Conditions and Privacy Policy{" "}
            </label>
            {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
          </div>

          <button type="submit" className="signup-btn" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </p>
        </div>

        <div className="help-section">
          <p>Need help?</p>
          <div className="help-links">
            <a href="tel:+919876543210">📞 Call Support</a>
            <a href="https://wa.me/919876543210">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  )
}
