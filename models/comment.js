
const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now()
  }
});

//Model
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;