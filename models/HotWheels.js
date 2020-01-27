// models\HotWheels.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const hotwheelSchema = new Schema({
  model: { 
    type: String,
    required: true
  },
  colors: {type: [String]},
  description: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  }
});
const Hotwheel = mongoose.model('hotwheel', hotwheelSchema);

module.exports = Hotwheel;
