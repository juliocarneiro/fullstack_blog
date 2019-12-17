const express = require("express");
const mongoose = require("./src/database");

const requireDir = require("require-dir");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const RateLimit = require("express-rate-limit");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying — full speed until the max limit is  reached
});

mongoose.set("useCreateIndex", true);

const app = express();

app.use(
  helmet({
    frameguard: {
      action: "deny"
    }
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use(cors());

requireDir("./src/models");
requireDir("./src/controllers");

app.use("/api", require("./src/routes"));

var porta = process.env.PORT || 3001;

app.listen(porta);
