import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  _id:   { type: String, required: true },
  score: { type: Number, default: 0 },
});

const Team = mongoose.model('Team', teamSchema);

export { Team, teamSchema };