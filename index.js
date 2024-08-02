const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const layoutController = require("./controllers/layoutController");
const carouselController = require("./controllers/carouselController");
const historyController = require("./controllers/historyController");
const directoryController = require("./controllers/directoryController");
const formController = require("./controllers/formController");
const responseController = require("./controllers/responseController");
const connectDB = require("./config/db"); // Adjust the path if necessary

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Example route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/layouts", layoutController);
app.use("/api/carousels", carouselController);
app.use("/api/history", historyController);
app.use("/api/directories", directoryController);
app.use("/api/forms", formController);
app.use("/api/responses", responseController);

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
