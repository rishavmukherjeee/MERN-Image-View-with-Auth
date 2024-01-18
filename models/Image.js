const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  title:{
    type: String,
    default: "Untitled"
  },
  description:{
    type: String,
    default: "No description"
  }
  
});

module.exports = mongoose.model('Image', ImageSchema);
