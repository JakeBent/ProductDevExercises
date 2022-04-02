const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  text: String,
  priority: {
    type: Number,
    default: 0,
  },
  isCompleted: Boolean,
}, { timestamps: true })

module.exports = {
  Todo: mongoose.model('todo', todoSchema),
}