"use client"

import { useState } from "react"
import { User, Phone, MapPin, Mail, Edit, Save, X } from "lucide-react"
import "../css/Profile.css"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "राजेश कुमार",
    phone: "+91 98765 43210",
    email: "rajesh@example.com",
    village: "darbhanga-city",
    address: "Village Rampur, Post Rampur, Tehsil Rampur",
    state: "Bihar",
    pincode: "846004",
  })

  const [editData, setEditData] = useState({ ...profileData })

  // TODO: Backend connection - Fetch user profile
  // GET /api/users/profile/:userId
  // Response: { user: {...} }

  const handleEdit = () => {
    setIsEditing(true)
    setEditData({ ...profileData })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({ ...profileData })
  }

  const handleSave = async () => {
    // TODO: Backend connection - Update user profile
    // PUT /api/users/profile/:userId
    // Body: editData
    // Response: { success, user }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setProfileData({ ...editData })
      setIsEditing(false)
      alert("Profile updated successfully!")
    } catch (error) {
      alert("Error updating profile. Please try again.")
    }
  }

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    })
  }

  const stats = {
    totalRequests: 12,
    completedRequests: 10,
    totalSpent: 2450,
    memberSince: "January 2024",
  }

  return (
    <div className="profile">
      <div className="page-header">
        <h1>Profile Settings</h1>
        <p>अपनी personal information manage करें</p>
      </div>

      <div className="profile-container">
        <div className="profile-main">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <User className="avatar-icon" />
              </div>
              <div className="profile-info">
                <h2>{profileData.name}</h2>
                <p>{profileData.phone}</p>
                <div className="member-since">Member since {stats.memberSince}</div>
              </div>
              <div className="profile-actions">
                {!isEditing ? (
                  <button className="btn btn-primary" onClick={handleEdit}>
                    <Edit className="btn-icon" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button className="btn btn-success" onClick={handleSave}>
                      <Save className="btn-icon" />
                      Save
                    </button>
                    <button className="btn btn-outline" onClick={handleCancel}>
                      <X className="btn-icon" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="profile-form">
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                        placeholder="आपका पूरा नाम"
                      />
                    ) : (
                      <div className="form-value">{profileData.name}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Mobile Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                        placeholder="Mobile number"
                      />
                    ) : (
                      <div className="form-value">{profileData.phone}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleChange}
                        placeholder="Email address"
                      />
                    ) : (
                      <div className="form-value">{profileData.email}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Village/City</label>
                    {isEditing ? (
                      <select name="village" value={editData.village} onChange={handleChange}>
                        <optgroup label="Darbhanga">
                          <option value="darbhanga-city">Darbhanga City</option>
                          <option value="laheriasarai">Laheriasarai</option>
                          <option value="keoti">Keoti</option>
                          <option value="manigachi">Manigachi</option>
                          <option value="singhwara">Singhwara</option>
                        </optgroup>
                        <optgroup label="Madhubani">
                          <option value="madhubani-city">Madhubani City</option>
                          <option value="jhanjharpur">Jhanjharpur</option>
                          <option value="phulparas">Phulparas</option>
                          <option value="benipatti">Benipatti</option>
                          <option value="khajauli">Khajauli</option>
                        </optgroup>
                      </select>
                    ) : (
                      <div className="form-value">
                        {profileData.village.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Address Information</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Complete Address</label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={editData.address}
                        onChange={handleChange}
                        placeholder="Complete address"
                        rows={3}
                      />
                    ) : (
                      <div className="form-value">{profileData.address}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="state"
                        value={editData.state}
                        onChange={handleChange}
                        placeholder="State"
                      />
                    ) : (
                      <div className="form-value">{profileData.state}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>PIN Code</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="pincode"
                        value={editData.pincode}
                        onChange={handleChange}
                        placeholder="PIN Code"
                      />
                    ) : (
                      <div className="form-value">{profileData.pincode}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-sidebar">
          <div className="stats-card">
            <h3>Account Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{stats.totalRequests}</div>
                <div className="stat-label">Total Requests</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats.completedRequests}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">₹{stats.totalSpent}</div>
                <div className="stat-label">Total Spent</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">96%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <h3>Contact Information</h3>
            <div className="contact-items">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">{profileData.phone}</div>
                </div>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">{profileData.email}</div>
                </div>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">
                    {profileData.village.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="help-card">
            <h3>Need Help?</h3>
            <p>अगर आपको कोई problem है तो हमसे contact करें।</p>
            <div className="help-actions">
              <a href="tel:+919876543210" className="btn btn-outline">
                Call Support
              </a>
              <a href="https://wa.me/919876543210" className="btn btn-outline">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
