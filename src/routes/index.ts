import { Router } from 'express'

import userRouter from '@routes/userRouter'
import postRouter from '@routes/postRouter'
import commentRouter from '@routes/commentRouter'

const router = Router()

router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/comment', commentRouter)

export default router
