const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  created: Date,
  modified: Date,
});
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.created = returnedObject.created.getTime();
    returnedObject.modified = returnedObject.modified.getTime();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Blog", blogSchema);
