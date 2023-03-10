import sequelize from '../db'
import { DataTypes, Model } from 'sequelize'

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

User.hasMany(Post)
Post.belongsTo(User)

Post.hasMany(Comment)
Comment.belongsTo(Post)

export default { User, Post, Comment }
export { User, Post, Comment }
