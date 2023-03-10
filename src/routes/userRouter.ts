import { Router } from 'express'
import UserController from '@controllers/userController'
import verifySignUp from '@middlewares/verifySignUp'

const userController = new UserController()
const router = Router()

router.post('/reg', verifySignUp, userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.auth)
router.get('/refresh', userController.refreshToken)

export default router
