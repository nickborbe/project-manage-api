const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
// const User     = require('./user');




const taskSchema = new Schema({
  title: String,
  description: String,
  doneyet: {type: Boolean, default: false},
  project: {type: Schema.Types.ObjectId, ref: 'Project'}

});

const Task = mongoose.model("Task", taskSchema);



module.exports = Task;