const mongoose = require("mongoose");

mongoose.connect("mongodb://", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
