import userModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'

// Get User
export const getUser = async (req, res) => {
  const id = req.params.id
  try {
    const user = await userModel.findById(id)
    const { password, ...other } = user._doc
    if (user) {
      res.status(200).json(other)
    } else res.status(404).json('no such user exists')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// update User
export const updateUser = async (req, res) => {
  const id = req.params.id
  const { currentUserId, currenrUsserAdminStatus, password } = req.body

  if (id === currentUserId || currenrUsserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(password, salt)
      }
      const user = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      })
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else res.status(403).json('Access Denied! You can update your own profile')
}

//delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id
  const { currentUserId, currenrUsserAdminStatus } = req.body

  if (id === currentUserId || currenrUsserAdminStatus) {
    try {
      await userModel.findByIdAndDelete(id)
      res.status(200).json('User Deleteed')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else res.status(403).json('Access Denied! You can delete your own profile')
}

// follow User
export const followUser = async (req, res) => {
  const id = req.params.id
  const { currentUserId } = req.body
  if (id === currentUserId) {
    res.status(403).json("You can't follow yourseft")
  } else {
    try {
      const followUser = await userModel.findById(id)
      const followingUser = await userModel.findById(currentUserId)
      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } })
        await followingUser.updateOne({ $push: { following: id } })
        res.status(200).json('Following')
      } else {
        await followUser.updateOne({ $pull: { followers: currentUserId } })
        await followingUser.updateOne({ $pull: { following: id } })
        res.status(200).json('Unfollowed')
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
