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
    type: String
  },
  description:{
    type: String
  }
  
});

module.exports = mongoose.model('Image', ImageSchema);
