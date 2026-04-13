import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: String,
  name: String,
  avatar: String,
  bio: String,
  location: String,
  skills: [String],
  topLanguages: [String],
  lookingFor: String,
  goals: String,
  githubUrl: String,
  followers: Number,
  publicRepos: Number,
  lastActive: Date,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.User || mongoose.model("User", UserSchema)