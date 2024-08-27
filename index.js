const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const layoutController = require("./controllers/layoutController");
const carouselController = require("./controllers/carouselController");
const historyController = require("./controllers/historyController");
const directoryController = require("./controllers/directoryController");
const formController = require("./controllers/formController");
const responseController = require("./controllers/responseController");
const userController = require("./controllers/userController");
const connectDB = require("./config/db");
const path = require("path");
const fs = require("fs");
const upload = require("./config/multerCarouselConfig");
const authenticateJWT = require("./middleware/auth"); // Import the middleware
const uploadController = require("./controllers/uploadController");
const videoRoutes = require("./routes/videoRoutes");
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Example route (public)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Protected routes (using the authenticateJWT middleware)
app.use("/api/layouts", authenticateJWT, layoutController);
app.use(
  "/api/carousels",
  authenticateJWT,
  upload.array("images"),
  carouselController
);
app.use("/api/history", authenticateJWT, historyController);
app.use("/api/directories", authenticateJWT, directoryController);
app.use("/api/forms", authenticateJWT, formController);
app.use("/api/responses", authenticateJWT, responseController);
app.use("/api/users", userController);
app.use("/api/upload", uploadController);
app.use("/api/videos", videoRoutes);
// Error handling middleware (optional)
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

// Connect to the database and then start the server
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit process with failure
  });
