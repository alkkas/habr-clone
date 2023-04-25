import { DataTypes, Model } from 'sequelize'
import ModelWithLikes from 'types'
import sequelize from '../db'

class User extends Model {
  declare id: string
  declare password: string
  declare email: string
  declare userName: string
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'User' }
)

class Post extends ModelWithLikes {
  declare id: string
  declare content: JSON
  declare likesCount: number
  declare dislikesCount: number
}
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    likesCount: {
      type: DataTypes.INTEGER,
    },
    dislikesCount: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: 'Post' }
)

class Comment extends ModelWithLikes {
  declare id: string
  declare content: string
  declare likesCount: number
  declare dislikesCount: number
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likesCount: {
      type: DataTypes.INTEGER,
    },
    dislikesCount: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: 'Comment' }
)
const uppercaseFirst = (str: string) =>
  `${str[0].toUpperCase()}${str.substr(1)}`

class Like extends Model {
  declare isLike: boolean
  declare likeType: string
  declare likeId: number
  declare UserId: number;
  [i: string]: any
  getLikes(options: any) {
    if (!this.likeType) return Promise.resolve(null)
    const mixinMethodName = `get${uppercaseFirst(this.likeType)}`
    return this[mixinMethodName](options)
  }
}
Like.init(
  {
    isLike: DataTypes.BOOLEAN,
    likeType: DataTypes.STRING,
    likeId: DataTypes.INTEGER,
  },
  { sequelize, modelName: 'likes' }
)

User.hasMany(Post)
Post.belongsTo(User)
Comment.belongsTo(User)
User.hasMany(Like)

Post.hasMany(Comment)
Comment.belongsTo(Post)
Post.hasMany(Like, {
  foreignKey: 'PostId',
  constraints: false,
  scope: { likeType: 'post' },
})
Like.belongsTo(Post, { foreignKey: 'PostId', constraints: false })

Comment.hasMany(Like, {
  foreignKey: 'CommentId',
  constraints: false,
  scope: { likeType: 'comment' },
})

Like.addHook('afterFind', (findResult) => {
  if (!Array.isArray(findResult)) {
    // @ts-ignore
    findResult = [findResult]
  }
  // @ts-ignore
  for (const instance of findResult) {
    if (instance.commentableType === 'post' && instance.image !== undefined) {
      instance.like = instance.post
    } else if (
      instance.commentableType === 'comment' &&
      instance.video !== undefined
    ) {
      instance.like = instance.comment
    }
    // To prevent mistakes:
    delete instance.post
    delete instance.dataValues.post
    delete instance.comment
    delete instance.dataValues.comment
  }
})

export { User, Post, Comment, Like }
