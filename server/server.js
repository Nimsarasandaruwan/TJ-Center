 /* =================================
   TJ CENTER PRO
   SERVER ENTRY FILE
================================= */

require("dns").setDefaultResultOrder("ipv4first");

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

// Connect Database
connectDB();

const app = express();

/* =================================
   MIDDLEWARE
================================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* =================================
   STATIC FILES
================================= */

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* =================================
   API ROUTES
================================= */

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/users", require("./routes/users"));
app.use("/api/cart", require("./routes/cartRoutes"));

/* =================================
   TEST ROUTE
================================= */

app.get("/", (req, res) => {
  res.send("TJ CENTER PRO SERVER RUNNING");
});

/* =================================
   404 HANDLER
================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =================================
   GLOBAL ERROR HANDLER
================================= */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

/* =================================
   SERVER START
================================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});