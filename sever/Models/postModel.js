import mongoose from 'mongoose'

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: String,
    likes: [],
    image: String,
    hastag: String,
    comments: { type: Array },
  },
  {
    timestamps: true,
  },
)

const postModel = mongoose.model('posts', PostSchema)
export default postModel
