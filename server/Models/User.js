const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      required: function () {
        return this.authProvider === "local"
      },
    },

    village: {
      type: String,
      required: function () {
        return this.authProvider === "local"
      },
    },

    password: {
      type: String,
      required: function () {
        return this.authProvider === "local"
      },
    },

    agreeToTerms: {
      type: Boolean,
      required: function () {
        return this.authProvider === "local"
      },
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    collection: "signup",
  }
)

// ✅ IMPORTANT: CommonJS export
module.exports = mongoose.models.User || mongoose.model("User", userSchema)