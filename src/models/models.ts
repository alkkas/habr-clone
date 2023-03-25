import { DataTypes, Model } from 'sequelize'
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

class Post extends Model {
  declare id: string
  declare content: JSON
  declare likes: number
  declare dislikes: number
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
      type: DataTypes.JSON,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    dislikes: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: 'Post' }
)

class Comment extends Model {
  declare id: string
  declare content: string
  declare likes: number
  declare dislikes: number
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
    likes: {
      type: DataTypes.INTEGER,
    },
    dislikes: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: 'Comment' }
)

const Likes = sequelize.define('Likes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  isLike: {
    type: DataTypes.BOOLEAN,
  },
})

User.hasMany(Post)
User.hasMany(Likes)
Post.belongsTo(User)

Post.hasMany(Comment)
Post.hasMany(Likes)
Comment.belongsTo(Post)

export default { User, Post, Comment, Likes }
export { User, Post, Comment, Likes }
