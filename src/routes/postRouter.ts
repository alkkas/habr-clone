import PostController from '@controllers/postController'
import { Router } from 'express'

const router = Router()
const postController = new PostController()

router.post('/', postController.createPost)
router.post('/like', postController.likePost)
router.get('/', postController.getAllPosts)
router.get('/:id', postController.getPost)
router.put('/:id', postController.changePost)
router.delete('/:id', postController.deletePost)

export default router
