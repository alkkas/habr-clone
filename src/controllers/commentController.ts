import { Response, Request } from 'express'
import { Comment } from '@models/models'

class CommentController {
  async createComment(req: Request, res: Response) {
    const { content } = req.body
    const { PostId } = req.params
    const UserId = req.body.decoded.id
    if (content && PostId) {
      await Comment.create({ PostId, UserId, content, likes: 0, dislikes: 0 })
      return res.status(200).json({ message: 'success' })
    } else {
      return res
        .status(400)
        .json({ message: 'content or postId not specified' })
    }
  }
  async updateComment(req: Request, res: Response) {}
}

export default CommentController
