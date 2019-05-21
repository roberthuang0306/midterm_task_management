
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    default: Date.now
  }, 
  end: {
    type: Date,
    default: Date.now
  }
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;