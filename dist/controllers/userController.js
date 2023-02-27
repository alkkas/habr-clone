"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models/models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const tokenList = {};
class UserController {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const user = models_1.User.create({
                    userName: req.body.userName,
                    email: req.body.email,
                    password: bcrypt_1.default.hashSync(req.body.password, 10),
                });
                const userData = {
                    userName: req.body.userName,
                    email: req.body.email,
                };
                const token = jsonwebtoken_1.default.sign(userData, config_1.default.secret, {
                    expiresIn: config_1.default.tokenLife,
                });
                const refreshToken = jsonwebtoken_1.default.sign(userData, config_1.default.refreshToken, {
                    expiresIn: config_1.default.refreshTokenLife,
                });
                const response = {
                    status: 'logged In',
                    token,
                    refreshToken,
                };
                tokenList[refreshToken] = response;
                res.status(200).json(response);
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: 'error while registering user' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ msg: 'asdf' });
        });
    }
}
exports.default = UserController;