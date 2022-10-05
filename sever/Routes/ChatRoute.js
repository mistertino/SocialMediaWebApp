import express from 'express'
import { creatChat, userChats, findChat } from '../Controller/ChatController.js'

const router = express.Router()

router.post('/', creatChat)
router.get('/:userId', userChats)
router.get('/find/:firstId/:secondId', findChat)

export default router
