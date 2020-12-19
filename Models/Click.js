const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClickSchema = new Schema({
  domain: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Click = mongoose.model("click", ClickSchema);
