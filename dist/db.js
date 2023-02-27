"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
console.log(process.env.DATABASE_URL);
const sequelize = new sequelize_1.Sequelize((_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : "");
exports.default = sequelize;
