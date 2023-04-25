import CommentController from '@controllers/commentController'
import { Router } from 'express'

const router = Router()
const commentController = new CommentController()

router.post('/', commentController.createComment)
router.put('/:id', commentController.updateComment)
router.post('/:id/like', commentController.likeComment)

export default router
