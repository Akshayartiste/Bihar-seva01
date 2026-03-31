const express = require("express")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const router = express.Router()

// Google login start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.redirect(`http://localhost:5173/google-success?token=${token}`)
  }
)

// ✅ IMPORTANT EXPORT
module.exports = router