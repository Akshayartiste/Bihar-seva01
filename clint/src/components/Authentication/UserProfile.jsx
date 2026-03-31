"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../css/UserProfile.css"

export default function UserProfile() {
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    profilePic: "",
    name: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
    district: "",
    pincode: "",
    latitude: "",
    longitude: "",
  })

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState(null)
  const [mobileEditable, setMobileEditable] = useState(true)

  // 🔹 Load user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const p = JSON.parse(storedUser)
        setUserData({
          profilePic: p.profilePic || "",
          name: p.name || "",
          mobile: p.mobile || "",
          email: p.email || "",
          address: p.address || "",
          password: p.password || "",
          district: p.district || "",
          pincode: p.pincode || "",
          latitude: p.latitude || "",
          longitude: p.longitude || "",
        })
        if (p.mobile) setMobileEditable(false)
      } else {
        navigate("/login")
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  // 🔹 Get browser location & reverse geocode
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserData(prev => ({ ...prev, latitude, longitude }))

          // Reverse geocode with OpenStreetMap Nominatim
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              const address = data.address || {}
              setUserData(prev => ({
                ...prev,
                district: address.county || address.city || "",
                pincode: address.postcode || ""
              }))
            })
            .catch(err => console.error("Geocode error:", err))
        },
        (error) => console.error("Location error:", error),
        { enableHighAccuracy: true }
      )
    }
  }, [])

  const showToast = (type, msg) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setUserData(prev => ({ ...prev, profilePic: reader.result }))
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        showToast("error", "Passwords do not match. Please try again.")
        return
      }
      userData.password = newPassword
    }
    localStorage.setItem("user", JSON.stringify(userData))
    showToast("success", "Profile saved successfully!")
    setNewPassword("")
    setConfirmPassword("")
    setMobileEditable(false)
  }

  const initials = userData.name
    ? userData.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  return (
    <div className="up-root">
      <div className="up-wrapper">

        {/* Header */}
        <div className="up-header">
          <h1 className="up-header-title">My <span>Profile</span></h1>
        </div>

        {/* Avatar Card */}
        <div className="up-avatar-card">
          <div className="up-avatar-wrap">
            {userData.profilePic ? (
              <img src={userData.profilePic} alt="Profile" className="up-avatar-img" />
            ) : (
              <div className="up-avatar-initials">{initials}</div>
            )}
            <label htmlFor="up-file" className="up-avatar-label">📷</label>
            <input
              id="up-file"
              type="file"
              accept="image/*"
              className="up-file-input"
              onChange={handleProfilePicChange}
            />
          </div>
          <div className="up-avatar-info">
            <p className="up-avatar-name">{userData.name || "Your Name"}</p>
            <p className="up-avatar-email">{userData.email || "your@email.com"}</p>
            <span className="up-avatar-badge">✦ Member</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="up-form-card">

          <p className="up-section-label">Personal Info</p>

          <div className="up-grid">
            <div className="up-field">
              <label className="up-label">
                Full Name <span className="up-label-locked">Locked</span>
              </label>
              <input className="up-input" type="text" name="name" value={userData.name} disabled />
            </div>
            <div className="up-field">
              <label className="up-label">
                Mobile {!mobileEditable && <span className="up-label-locked">Locked</span>}
              </label>
              <input
                className="up-input"
                type="text"
                name="mobile"
                value={userData.mobile}
                onChange={handleInputChange}
                placeholder="+91 00000 00000"
                disabled={!mobileEditable}
              />
            </div>
          </div>

          <div className="up-field">
            <label className="up-label">Email Address <span className="up-label-locked">Locked</span></label>
            <input className="up-input" type="email" name="email" value={userData.email} disabled />
          </div>

          <div className="up-field">
            <label className="up-label">Address</label>
            <textarea className="up-textarea" name="address" value={userData.address} onChange={handleInputChange} placeholder="Enter your delivery address…" />
          </div>

          <div className="up-grid">
            <div className="up-field">
              <label className="up-label">District</label>
              <input className="up-input" type="text" name="district" value={userData.district} onChange={handleInputChange} />
            </div>
            <div className="up-field">
              <label className="up-label">Pincode</label>
              <input className="up-input" type="text" name="pincode" value={userData.pincode} onChange={handleInputChange} />
            </div>
          </div>

          <div className="up-divider" />

          <p className="up-section-label">Security</p>

          <div className="up-field">
            <label className="up-label">New Password</label>
            <div className="up-pw-wrap">
              <input
                className="up-input"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <button type="button" className="up-pw-toggle" onClick={() => setShowPassword(p => !p)}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="up-field">
            <label className="up-label">Confirm Password</label>
            <input
              className="up-input"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
            />
          </div>

          <button className="up-save-btn" onClick={handleSave}>Save Changes</button>

          {toast && (
            <div className={`up-toast up-toast-${toast.type}`}>
              {toast.type === "success" ? "✓" : "✕"} {toast.msg}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}