import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js"
import forgotPasswordRouter from "./routes/forgotPassword.js"

// Load environment variables
dotenv.config()

// App config
const app = express()
const PORT = process.env.PORT || 8000
mongoose.set('strictQuery', true);

// Middlewares
app.use(express.json())
app.use(cors())

// DB config
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
}, (err) => {
  if (err) {
    console.log("MongoDB connection error:", err)
  } else {
    console.log("✅ MongoDB connected")
  }
})

// Routes
app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)
app.use("/api/forgotPassword", forgotPasswordRouter)

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
