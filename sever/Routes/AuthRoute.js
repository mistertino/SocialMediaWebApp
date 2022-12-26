import express from 'express'
import {
  registerUser,
  loginUser,
  activeUser,
} from '../Controller/AuthController.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put(`/active/:hash`, activeUser)

export default router
