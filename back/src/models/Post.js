const mongoose = require("mongoose");
const moment = require("moment");
const mongoosePaginate = require("mongoose-paginate-v2");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: moment().format("DD/MM/YYYY")
  }
});

PostSchema.plugin(mongoosePaginate);

mongoose.model("Post", PostSchema);
