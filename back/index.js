const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");
mongoose.set("useCreateIndex", true);

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://SEUENDERECO", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

requireDir("./src/models");
requireDir("./src/controllers");

app.use("/api", require("./src/routes"));

app.listen(3001);
