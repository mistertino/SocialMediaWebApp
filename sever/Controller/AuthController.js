import userModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const algorithm = 'aes-256-cbc' //Using AES encryption
const key = Buffer.alloc(32)
key.write('tc', 'utf-8')
const iv = Buffer.alloc(16)
iv.write('media', 'utf-8')
// console.log(key)
// console.log(iv)
//Encrypting text
function encrypt(text) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') }
}

// Decrypting text
function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex')
  let encryptedText = Buffer.from(text.encryptedData, 'hex')
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

// var hw = encrypt('Welcome to Tutorials Point...')
// console.log(hw)
// console.log(decrypt(hw))

export const activeUser = async (req, res) => {
  const username = params.userId
  const hash = params.hash
  const user = await userModel.find({ username: username })
  const verify = bcrypt.compare(user.username, hash)
  if (verify) {
    await user.updateOne({ active: true })
    res.status(200).json(user)
  }
}

export const registerUser = async (req, res) => {
  // hash password before save
  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(req.body.password, salt)
  req.body.password = hashedPass
  // Hash Email
  const hashedEmail = encrypt(req.body.username)
  req.body.hashedEmail = hashedEmail
  //Create new document
  const newUser = new userModel(req.body)
  const { username } = req.body
  try {
    const oldUser = await userModel.findOne({ username })
    // Check username already
    if (oldUser) {
      return res.status(400).json('Người dùng đã tồn tại')
    }
    const userRegister = await newUser.save()
    const token = jwt.sign(
      {
        username: userRegister.username,
        id: userRegister._id,
      },
      process.env.JWT_KEY,
    )
    const { password, hashedEmail, ...user } = userRegister._doc
    res.status(200).json({ user, token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body
  const salt = await bcrypt.genSalt(10)
  console.log(salt)
  try {
    const userLogin = await userModel.findOne({ username: username })
    if (userLogin) {
      //compare password input with password in database
      const verify = await bcrypt.compare(password, userLogin.password)
      if (!verify) {
        res.status(400).json('Tên đăng nhập hoặc mật khẩu không chính xác')
      } else {
        const token = jwt.sign(
          {
            username: userLogin.username,
            id: userLogin._id,
          },
          process.env.JWT_KEY,
        )
        const { password, ...user } = userLogin._doc
        res.status(200).json({ user, token })
      }
    } else res.status(404).json('Tên đăng nhập hoặc mật khẩu không chính xác')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
