const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Team', teamSchema);
