import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {
  const navigate = useNavigate(); // SPA redirect ke liye

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // USER DATA FETCH
      fetch("https://bihar-seva01.onrender.com/api/me", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  credentials: "include", // 👈 add this line
})
        .then((res) => res.json())
        .then((data) => {
          console.log("USER DATA:", data);

          // ✅ user save in localStorage
          localStorage.setItem("user", JSON.stringify(data.user));

          // SPA redirect instead of hard reload
          navigate("/home"); 
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          navigate("/login");
        });

    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <h2>Logging you in...</h2>;
}