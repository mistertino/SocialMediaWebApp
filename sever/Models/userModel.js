import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      public_id: { type: String },
      url: { type: String },
    },
    coverPicture: {
      public_id: { type: String },
      url: { type: String },
    },
    about: String,
    livesin: String,
    worksAt: String,
    country: String,
    relationship: String,
    followers: [],
    following: [],
    notifications: [],
    hashedEmail: {},
    active: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const userModel = mongoose.model('users', UserSchema)
export default userModel
