import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import User from "../models/User.js"

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value
        const name = profile.displayName

        let user = await User.findOne({ email })

        if (!user) {
          user = await User.create({
            name,
            email,
            googleId: profile.id,
            authProvider: "google",
            isVerified: true,
          })
        }

        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
    }
  )
)