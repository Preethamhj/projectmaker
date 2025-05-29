const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Project = require('../models/project');
const Team = require('../models/team');
const User = require('../models/user');

// -------------------- Create a Project --------------------
router.post('/create', async (req, res) => {
  try {
    const { name, description, teamId, createdBy } = req.body;

    if (!name || !description || !teamId || !createdBy) {
      return res.status(400).json({ error: 'All fields (name, description, teamId, createdBy) are required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ error: 'Invalid team ID' });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const project = await Project.create({
      name,
      description,
      team: teamId,
      createdBy,
      members: team.members
    });

    // Optionally update the team schema if it has a `projects` field (you'd need to define it first)
    // await Team.findByIdAndUpdate(teamId, { $addToSet: { projects: project._id } });

    // Add project to all team members
    await User.updateMany(
      { _id: { $in: team.members } },
      { $addToSet: { projects: project._id } }
    );

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Server error while creating project.' });
  }
});
// -------------------- Get All Projects for a Team --------------------
router.get('/:teamId', async (req , res ) =>{
    try{
        const { teamId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(teamId)){
            return res.status(400).json({ error:'Invalid team Id'})
        }
        const projects = await Project.find({ team : teamId })
        res.status(200).json({ projects });
    }
    catch (err){
        console.error('Error fetching projects:', err);
        res.status(500).json({ error: 'Server error while fetching projects.' });
    }
});
router.post('/edit/:projectId',async (req,res) => {
    try{
        const {projectId} = req.params;
        const { name,decription } = req.body ;
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return res.status(400).json({ error: 'Invalid project ID' });
        }
        const project =  await Project.findByIdAndUpdate(
            projectId,
            {name ,decription},
            {new : true , runValidators: true}
        );
        if(!project){
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ messsage : 'project updated successfully ',project});
    }
    catch(err){
        console.error('Error updating project:', err);
        res.status(500).json({ error: 'Server error while updating project.' });    
    }
    });

module.exports = router;
