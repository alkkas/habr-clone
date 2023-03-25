import { Likes, Post } from '@models/models'
import { Request, Response } from 'express'

class PostController {
  async createPost(req: Request, res: Response) {
    if (req.body.content && req.body.title) {
      await Post.create({
        title: req.body.title,
        content: req.body.content,
        likes: 0,
        dislikes: 0,
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
    return res.status(200)
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

  async likePost(req: Request, res: Response) {
    try {
      const UserId = req.body.decoded.id
      const { isLike, PostId } = req.body
      if (isLike !== undefined && PostId) {
        const like = await Likes.findOne({ where: { UserId, PostId } })
        if (like) {
          Likes.update({ isLike }, { where: { UserId, PostId } })
        } else {
          await Likes.create({ UserId, PostId, isLike })
        }
        return res.status(200).json({ message: 'success' })
      } else {
        return res
          .status(400)
          .json({ message: 'isLike or postId fields not specified' })
      }
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default PostController
