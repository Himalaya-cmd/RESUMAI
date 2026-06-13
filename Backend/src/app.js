const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_2,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://resumai-2.onrender.com",
    "https://resumai-0nwe.onrender.com"
].filter(Boolean)

const isAllowedRenderOrigin = (origin) => {
    return typeof origin === "string" && origin.endsWith(".onrender.com")
}

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true)
        if (allowedOrigins.includes(origin) || isAllowedRenderOrigin(origin)) return callback(null, true)
        callback(new Error("CORS error: Origin not allowed"))
    },
    credentials: true
}))

// require all the routes here
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* Using all the routes here */
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)

module.exports = app;