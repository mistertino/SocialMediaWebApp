import userModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
  // hash password before save
  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(req.body.password, salt)
  req.body.password = hashedPass
  //Create new document
  const newUser = new userModel(req.body)
  const { username } = req.body
  try {
    const oldUser = await userModel.findOne({ username })
    // Check username already
    if (oldUser) {
      return res.status(400).json({ message: 'Username is already!' })
    }
    const userRegister = await newUser.save()
    const token = jwt.sign(
      {
        username: userRegister.username,
        id: userRegister._id,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' },
    )
    const { password, ...user } = userRegister._doc
    res.status(200).json({ user, token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body
  try {
    const userLogin = await userModel.findOne({ username: username })
    if (userLogin) {
      //compare password input with password in database
      const verify = await bcrypt.compare(password, userLogin.password)
      if (!verify) {
        res.status(400).json('Wrong password')
      } else {
        const token = jwt.sign(
          {
            username: userLogin.username,
            id: userLogin._id,
          },
          process.env.JWT_KEY,
          { expiresIn: '1h' },
        )
        const { password, ...user } = userLogin._doc
        res.status(200).json({ user, token })
      }
    } else res.status(404).json('Username not found')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
