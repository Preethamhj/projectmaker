const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Assuming your models are like this:
const Team = require('../models/team');
const User = require('../models/user');


// -------------------- Create a Team --------------------
router.post('/create', async (req, res) => {
  try {
    const { name, description, createdBy } = req.body;

    if (!name || !description || !createdBy) {
      return res.status(400).json({ error: 'All fields (name, description, createdBy) are required.' });
    }

    // Create a new team
    const team = await Team.create({
      name,
      description,
      createdBy,
      members: [createdBy]
    });

    // Add team to the creator's list
    await User.findByIdAndUpdate(createdBy, {
      $addToSet: { teams: team._id }
    });

    res.status(201).json({ message: 'Team created successfully', team });
  } catch (err) {
    console.error('Error creating team:', err);
    res.status(500).json({ error: 'Server error while creating team.' });
  }
});

// -------------------- Add Members to a Team --------------------
router.post('/:teamId/add-members', async (req, res) => {
  try {
    const { teamId } = req.params;
    const { memberIds } = req.body;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ error: 'Invalid team ID' });
    }

    if (!Array.isArray(memberIds) || memberIds.length === 0) {
      return res.status(400).json({ error: 'memberIds must be a non-empty array' });
    }

    // Check if team exists
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ error: 'Team not found' });

    // Add members to the team (no duplicates)
    await Team.findByIdAndUpdate(teamId, {
      $addToSet: { members: { $each: memberIds } }
    });

    // Also update each user's "teams" list
    await User.updateMany(
      { _id: { $in: memberIds } },
      { $addToSet: { teams: team._id } }
    );

    res.status(200).json({ message: 'Members added to the team successfully' });
  } catch (err) {
    console.error('Error adding members:', err);
    res.status(500).json({ error: 'Server error while adding members' });
  }
});

// -------------------- Test Route --------------------
router.get('/test', (req, res) => {
  res.send('Team route is working!');
});

router.get('/allteams', async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('members', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json(teams);
    console.log({ message: "Teams fetched successfully", teams });
  } catch (err) {
    console.error('Error fetching teams:', err);
    res.status(500).json({ error: "Server error while fetching teams" });
  }
});

// -------------------- Get Team by ID --------------------
router.get('/delete/:teamId',async (req,res)=>{
  try{
    const {teamId} =req.params;
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ error: 'Invalid team ID' });
    }
    const team = await Team.findByIdAndDelete(teamId);
    if(!team){
      return res.status(404).json({error : 'team not found '});
    }
    res.status(200).json({message : 'team deleted successfully ',team});
  }
  catch(err){
    console.error('Error deleting team :',err);
    res.status(500).json({error :'server error while deleting team '});
  }
});

// -------------------- Remove Team Member --------------------
  router.get('/delete/teammember/:teamId/:memberId',async(req,res) =>{
    try{
      const { teamId ,memberId }= req.params;
      if (!mongoose.Types.ObjectId.isValid(teamId) || !mongoose.Types.ObjectId.isValid(memberId)) {
        return res.status(400).json({ error: 'Invalid team ID or member ID' });
      }
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }

      const memberIndex= team.members.indexOf(memberId);
      if (memberIndex === -1) {
        return res.status(404).json({ error: 'Member not found in the team' });
      }
      team.members.splice(memberIndex, 1);
      await team.save();
      res.status(200).json({message:'memeber removed from team susccessfully',team});
    }
    catch(err){
      console.error('Error removing team member:',err);
      res.status(500).json({error:'server error while removing team member '});
    }
    });

module.exports = router;
