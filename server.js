require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/* Storage */
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* Routes */

// Upload file
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully ✅" });
});

// Get files
app.get("/files", (req, res) => {
  const files = fs.readdirSync(uploadDir);
  res.json(files.map(f => ({ filename: f })));
});

// Health check (important for Render)
app.get("/health", (req, res) => {
  res.send("Server is running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));