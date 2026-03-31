require("dotenv").config()
const express = require("express")
const session = require("express-session")
const passport = require("passport")
const cors = require("cors")

const connectDb = require("./utlis/db")

// 🔥 IMPORTANT: passport config import
require("./Config/passport")

// 🔥 routes
const authRoutes = require("./Routes/auth")
const userRoutes = require("./Routes/user")


const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())

app.use(cors({
  origin:[ "http://localhost:5173",
    "https://bihar-seva001.netlify.app",
    ] ,
  credentials: true
}))

// 🔐 session (Google auth ke liye needed)
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
)

// 🔐 passport middleware
app.use(passport.initialize())
app.use(passport.session())

// test route
app.get("/ping", (req, res) => {
  res.send("hii")
})
app.get("/hoo", (req, res) => {
  res.send("API Running 🚀")
})
// 🔥 auth routes
app.use("/auth", authRoutes)
app.use("/api", userRoutes)

// DB + Server start
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.log("❌ Failed to connect DB", err)
  })