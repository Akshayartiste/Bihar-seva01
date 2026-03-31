const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../Models/User")
const authMiddleware = require("../Middlewares/authMiddleware")

// ======================
// ✅ SIGNUP
// ======================
router.post("/signup", async (req, res) => {
  try {
    const { name, phone, email, village, password, agreeToTerms } = req.body

    // 🔍 Check existing user
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // 🔥 Create user
    const user = await User.create({
      name,
      phone,
      email,
      village,
      password,
      agreeToTerms,
      authProvider: "local",
    })

    // 🔐 JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    // ✅ Response
    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})


// ======================
// ✅ LOGIN
// ======================
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body

    // 🔍 Find user
    const user = await User.findOne({ phone })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // 🔐 Password check (simple for now)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" })
    }

    // 🔐 Token generate
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    // ✅ IMPORTANT: USER SEND KARO
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// ======================
// ✅ GET CURRENT USER
// ======================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router