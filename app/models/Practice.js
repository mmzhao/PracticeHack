var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// main ucce schema containing all information related to a certain release
var practiceSchema = new Schema({
  message: {type: String, required: true}
});

mongoose.model('Practice', practiceSchema);
