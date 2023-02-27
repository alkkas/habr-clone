"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const verifySignUp_1 = __importDefault(require("../middlewares/verifySignUp"));
const userController = new userController_1.default();
const router = (0, express_1.Router)();
router.post('/reg', verifySignUp_1.default, userController.registration);
router.post('/login', userController.login);
router.get('/auth', userController.auth);
exports.default = router;
