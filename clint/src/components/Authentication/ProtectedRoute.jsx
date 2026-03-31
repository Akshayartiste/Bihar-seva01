import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import AuthRequired from "./AuthRequired"

export default function ProtectedRoute({ children }) {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    setToken(storedToken)
  }, [])

  // ⏳ Jab tak check ho raha hai
   if (!token) {
    return <AuthRequired />
  }

  // ❌ No token
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // ✅ Token present
  return children
}