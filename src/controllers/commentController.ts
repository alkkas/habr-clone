import { Comment } from '@models/models'
import likeHelper from '@utils/likeHelper'
import { NextFunction, Request, Response } from 'express'
class CommentController {
  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { content, PostId } = req.body
      const UserId = req.body.decoded.id
      if (content && PostId) {
        await Comment.create({
          PostId,
          UserId,
          content,
          likesCount: 0,
          dislikesCount: 0,
        })
        return res.status(200).json({ message: 'success' })
      } else {
        return res
          .status(400)
          .json({ message: 'content or postId not specified' })
      }
    } catch (e) {
      next(e)
    }
  }
  async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { content } = req.body
      const UserId = req.body.decoded.id
      const id = req.params.id

      const comment = await Comment.findOne({ where: { id, UserId } })

      if (comment) {
        Comment.update({ content }, { where: { id, UserId } })
        return res.status(200).json({ message: 'success' })
      }
      return res.status(403).json({ message: 'comment not found' })
    } catch (e) {
      next(e)
    }
  }
  async likeComment(req: Request, res: Response, next: NextFunction) {
    const params = {
      EntityId: +req.params.id,
      EntityName: 'Comment',
      EntityClass: Comment,
    }
    return likeHelper(req, res, next, params)
  }
}

export default CommentController
