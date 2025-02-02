const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const playerRoutes = require("./routes/players");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/players", playerRoutes);

mongoose.connect("mongodb://localhost:27017/indianCricket2011", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
.catch(err => console.error("Failed to connect to MongoDB", err));
