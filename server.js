const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
// Connect DB
connectDB();

// Use middleware
// app.use(express.json());
// express.urlencoded({ extended: true });
app.use(express.json({ extended: false }));

// Cors fixes
app.use(cors());

// Define routes
app.use("/api/clicks", require("./routes/api/click"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
