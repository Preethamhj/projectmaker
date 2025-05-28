const express = require('express');
const router = express.Router();
const { addMembersToTeam } = require('../controllers/teamcontroller');

// Add members to a team
router.post('/:teamId/add-members', addMembersToTeam);
router.get('/test', (req, res) => {
  res.send('Team route is working!');
});


router.post('/create', async (req, res) => {
  try {
    const { name, description, createdBy } = req.body;
    const team = await Team.create({ name, description, createdBy, members: [createdBy] });

    // Also add team to the creator's list
    await User.findByIdAndUpdate(createdBy, {
      $addToSet: { teams: team._id }
    });

    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
