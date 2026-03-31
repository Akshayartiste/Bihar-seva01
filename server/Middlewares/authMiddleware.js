// middleware/authMiddleware.js

const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  try {
    // 1. Token lo header se
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" })
    }

    const token = authHeader.split(" ")[1]

    // 2. Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 3. User ID store karo request me
    req.userId = decoded.id

    // 4. Next middleware / route
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

module.exports = authMiddleware