"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.Post = exports.User = void 0;
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
class Post extends sequelize_1.Model {
}
exports.Post = Post;
class Comment extends sequelize_1.Model {
}
exports.Comment = Comment;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, { sequelize: db_1.default, modelName: 'User' });
Post.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.JSON,
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    dislikes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, { sequelize: db_1.default, modelName: 'Post' });
Comment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    dislikes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, { sequelize: db_1.default, modelName: 'Comment' });
User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
exports.default = { User, Post, Comment };
