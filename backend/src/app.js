const express = require("express");
const multer = require("multer");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes")
const uploadRoutes = require("./routes/project.routes")
const aiRoutes = require("./routes/ai.routes")

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req,res)=>{
    res.json({ status: "Backend is running"})
})

//auth routes
app.use("/api/auth",authRoutes);

//projectUpload routes
app.use("/api/project",uploadRoutes)

//ai explaination route
app.use("/api/ai",aiRoutes)


app.use((err, req, res, next) => {
  console.error("🔥 Global Error Handler:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

module.exports = app;