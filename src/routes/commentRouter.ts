import { Router } from 'express'
import CommentController from '@controllers/commentController'

const router = Router()
const commentController = new CommentController()

router.post('/:PostId', commentController.createComment)
router.put('/:id', commentController.updateComment)

export default router
