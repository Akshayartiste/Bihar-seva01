import { Link } from "react-router-dom"

export default function AuthRequired() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>🔒</div>

        <h1 style={styles.title}>Access Restricted</h1>

        <p style={styles.text}>
          You need to login to access this page.  
          Please sign in to continue.
        </p>

        <div style={styles.buttonGroup}>
          <Link to="/login">
            <button style={styles.loginBtn}>Login Now</button>
          </Link>

          <button
            style={styles.reloadBtn}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  )
}

// 🎨 Styles (same file)
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    fontFamily: "Poppins, sans-serif",
  },

  card: {
    background: "#ffffff",
    padding: "40px 30px",
    borderRadius: "16px",
    textAlign: "center",
    width: "350px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.4s ease-in-out",
  },

  icon: {
    fontSize: "50px",
    marginBottom: "10px",
  },

  title: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#111827",
  },

  text: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "25px",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },

  loginBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },

  reloadBtn: {
    background: "transparent",
    border: "1px solid #ccc",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },
}