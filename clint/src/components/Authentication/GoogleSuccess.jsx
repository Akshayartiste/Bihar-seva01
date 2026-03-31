import { useEffect } from "react"

export default function GoogleSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")

    if (token) {
      localStorage.setItem("token", token)

      // 🔥 USER DATA FETCH KARO
      fetch("http://localhost:5000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("USER DATA:", data)

          // ✅ user save
          localStorage.setItem("user", JSON.stringify(data.user))

          // redirect
          window.location.href = "/home"
        })
        .catch((err) => {
          console.error("Error fetching user:", err)
          window.location.href = "/login"
        })

    } else {
      window.location.href = "/login"
    }
  }, [])

  return <h2>Logging you in...</h2>
}