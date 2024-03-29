import { Comment, Post } from '@models/models'
import likeHelper from '@utils/likeHelper'
import { NextFunction, Request, Response } from 'express'

class PostController {
  async createPost(req: Request, res: Response) {
    if (req.body.content && req.body.title) {
      await Post.create({
        title: req.body.title,
        content: req.body.content,
        likesCount: 0,
        dislikesCount: 0,
        UserId: req.body.decoded.id,
      })
      return res.status(200).json({ message: 'success' })
    }
    return res.status(401).json({ message: 'no content or title provided' })
  }
  async getAllPosts(req: Request, res: Response) {
    try {
      const UserId = req.body.decoded.id

      const posts = await Post.findAll({
        where: { UserId },
        attributes: { exclude: ['content'] },
      })
      if (posts) {
        return res.status(200).json({ posts })
      }
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async getPost(req: Request, res: Response) {
    try {
      const UserId = req.body.decoded.id
      if (req.params.id && UserId) {
        const post = await Post.findOne({
          where: { UserId, id: req.params.id },
          include: Comment,
        })
        if (post) {
          return res.status(200).json({ post })
        } else {
          return res.status(500).json({ message: 'Post not found' })
        }
      }
      return res.status(400).json({ message: 'Id of post not specified' })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async changePost(req: Request, res: Response) {
    if (req.body && req.params.id) {
      const values: any = {}
      for (const key in req.body) {
        if (key !== 'decoded') {
          values[key] = req.body[key]
        }
      }
      await Post.update({ ...values }, { where: { id: req.params.id } })
    } else {
      return res.status(400).json({ message: 'PostId not specified' })
    }
    return res.status(200).json({ message: 'success' })
  }
  async deletePost(req: Request, res: Response) {
    try {
      const UserId = req.body.decoded.id
      if (req.params.id) {
        const post = await Post.findOne({
          where: { UserId, id: req.params.id },
        })
        if (post) {
          await Post.destroy({
            where: { id: req.params.id },
          })
          await Comment.destroy({ where: { PostId: +req.params.id } })
          return res.status(200).json({ message: 'success' })
        } else {
          return res.status(403).json({
            message: `User doesn't have post with id ${req.params.id}`,
          })
        }
      }
      return res.status(401).json({ message: 'Id is not provided' })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async likePost(req: Request, res: Response, next: NextFunction) {
    const params = {
      EntityId: +req.params.id,
      EntityName: 'Post',
      EntityClass: Post,
    }
    return likeHelper(req, res, next, params)
  }
}

export default PostController
