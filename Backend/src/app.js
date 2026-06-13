const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://resumai-1-8oau.onrender.com",
    credentials: true
}))


// require all the routes here
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* Using all the routes here */
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)

module.exports = app;