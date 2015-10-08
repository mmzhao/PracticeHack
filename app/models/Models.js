
// package all models together for easy api access
require('../models/Practice');

var mongoose = require('mongoose');
var Practice = mongoose.model('Practice');
Practice.schemaType = 'Practice';

module.exports = {
  Practice: Practice
};