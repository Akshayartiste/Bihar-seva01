"use client"

import { useState , useEffect  } from "react"
import { Link , useNavigate} from "react-router-dom"

import { MapPin, Eye, EyeOff, Phone, Lock } from 'lucide-react'
import "../css/Login.css"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    rememberMe: false,
  })

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})


 useEffect(() => {
  const token = localStorage.getItem("token")
  if (token) {
    // Agar user already logged in hai, toh login page pe rukne ki zarurat nahi
    navigate("/home", { replace: true })
  }
}, [navigate])

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

    if (!formData.phone) {
      newErrors.phone = "Mobile number is required"
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  
// submit function 
 const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) {
    alert("Please enter valid details")
    return
  }

  setIsLoading(true)

  try {
    console.log("CALLING API...")
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: formData.phone,
        password: formData.password,
      }),
    })
    const data = await res.json()

    if (!res.ok) {
      // ❌ Login failed → stay on login page
      throw new Error(data.message || "Login failed")
    }

    // ✅ Save data
    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data.user))

    alert("Login successful!")

    // ✅ Redirect to HOME
    navigate("/home", { replace: true }) // back button se wapas login page na aaye

  } catch (error) {
    alert(error.message)

    // ❌ Force stay on login (optional)
    navigate("/login")
  } finally {
    setIsLoading(false)
  }
}


  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          {/* <Link href="/" className="logo">
            <MapPin className="logo-icon" />
            <span>BiharSeva</span>
          </Link> */}
          <h1>Welcome Back!</h1>
          <p>अपना account login करें</p>
        </div>

      <form onSubmit={handleSubmit} className="login-form">

          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}
      

          <div className="form-group">
            <label htmlFor="phone">Mobile Number</label>
            <div className="input-wrapper">
              <Phone className="input-icon" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className={errors.phone ? "error" : ""}
                maxLength="10"
              />
            </div>
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={errors.password ? "error" : ""}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>


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

          <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? (
            <div className="spinner-wrapper">
              <div className="spinner"></div>
              Logging in...
               </div>
            ) : (
              "Login"
            )}
           </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up here
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
