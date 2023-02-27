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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models/models");
const checkValidNameAndEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findOne({ where: { userName: req.body.userName } });
        if (user) {
            return res.status(400).send({
                message: 'Failed! Username is already in use!',
            });
        }
        const email = yield models_1.User.findOne({ where: { email: req.body.email } });
        if (email) {
            return res.status(400).send({
                message: 'Failed! Email is already in use!',
            });
        }
        next();
    }
    catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({ message: 'Unable to validate user registration' });
    }
});
exports.default = checkValidNameAndEmail;
