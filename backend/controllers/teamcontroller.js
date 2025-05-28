const Team = require('../models/team');
const User = require('../models/user');

const addMembersToTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { userIds } = req.body; // Expecting an array of user IDs

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    // Avoid duplicate entries
    const uniqueUserIds = userIds.filter(id => !team.members.includes(id));

    // Add users to team
    team.members.push(...uniqueUserIds);
    await team.save();

    // Update users to include this team
    await User.updateMany(
      { _id: { $in: uniqueUserIds } },
      { $addToSet: { teams: teamId } }
    );

    res.status(200).json({ message: 'Users added to team successfully', team });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { addMembersToTeam };
