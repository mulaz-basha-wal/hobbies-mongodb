const mongoose = require("mongoose");
const HobbySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  desc: { type: String, required: true, minlength: 10, maxlength: 100 },
  doc: { type: Date },
});
module.exports = mongoose.model("Hobby", HobbySchema);
