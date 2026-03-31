const mongoose = require("mongoose");
const URL = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URL); // ✅ no deprecated options
    console.log("✅ Connection successful to database");
  } catch (error) {
    console.error("❌ Database connect failed:", error.message);
    process.exit(1);
  }
};


module.exports = connectDb;