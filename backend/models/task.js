const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: { type:String ,required:true ,trim : true},
    description :{type: String },
    dueDate :{ type: Date },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;