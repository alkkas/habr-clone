import { Like } from '@models/models'
import { NextFunction, Request, Response } from 'express'
import ModelWithLikes from 'types'

class EntityClassType extends ModelWithLikes {
  declare likesCount: number
  declare dislikesCount: number
}

interface paramsType {
  EntityId: number
  EntityName: string
  EntityClass: typeof EntityClassType
}

const likeHelper = async (
  req: Request,
  res: Response,
  next: NextFunction,
  params: paramsType
) => {
  try {
    const UserId = req.body.decoded.id
    const { EntityId, EntityName, EntityClass } = params
    const { isLike } = req.body
    if (isLike !== undefined && EntityId) {
      const entity = await EntityClass.findOne({ where: { id: EntityId } })
      if (entity) {
        let likes = await entity.getLikes({ where: { UserId } })

        if (likes?.length === 1) {
          const like = likes[0]
          await Like.update(
            { isLike },
            { where: { UserId, [`${EntityName}Id`]: EntityId } }
          )
          if (isLike && !like.isLike) {
            await EntityClass.update(
              {
                likesCount: entity.likesCount + 1,
                dislikesCount: entity.dislikesCount - 1,
              },
              { where: { id: EntityId } }
            )
          } else if (!isLike && like.isLike) {
            await EntityClass.update(
              {
                likesCount: entity.likesCount - 1,
                dislikesCount: entity.dislikesCount + 1,
              },
              { where: { id: EntityId } }
            )
          }
        } else {
          await entity.createLike({ UserId, isLike })
          if (isLike) {
            await EntityClass.update(
              { likesCount: entity.likesCount + 1 },
              { where: { id: EntityId } }
            )
          } else {
            await EntityClass.update(
              { dislikesCount: entity.dislikesCount + 1 },
              { where: { id: EntityId } }
            )
          }
        }
        return res.status(200).json({ message: 'success' })
      } else {
        return res
          .status(400)
          .json({ message: `${EntityName} with id ${EntityId} not found` })
      }
    } else {
      return res
        .status(400)
        .json({ message: `isLike or ${EntityName} fields not specified` })
    }
  } catch (e) {
    next(e)
  }
}

export default likeHelper
