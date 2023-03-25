import { Router } from 'express'

import authJWT from '@middlewares/authJWT'
import commentRouter from '@routes/commentRouter'
import postRouter from '@routes/postRouter'
import userRouter from '@routes/userRouter'

const router = Router()

router.use('/user', userRouter)
router.use('/post', authJWT, postRouter)
router.use('/comment', authJWT, commentRouter)

export default router
