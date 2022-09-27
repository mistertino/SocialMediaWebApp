import userModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
  const { username, password, firstname, lastname } = req.body
  // hash password before save
  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(password, salt)
  //Create new document in database
  const newUser = new userModel({
    username,
    password: hashedPass,
    firstname,
    lastname,
  })
  try {
    await newUser.save()
    res.status(200).json(newUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await userModel.findOne({ username: username })
    if (user) {
      //compare password input with password in database
      const verify = await bcrypt.compare(password, user.password)
      verify
        ? res.status(200).json(user)
        : res.status(400).json('wrong password')
    } else res.status(404).json('Username not found')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
