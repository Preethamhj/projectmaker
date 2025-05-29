const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});


module.exports = mongoose.model('User', userSchema);
