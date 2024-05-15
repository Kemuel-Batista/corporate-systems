import { Router } from 'express'
import { AuthenticateController } from './authenticate.controller'

const authenticateController = new AuthenticateController()

export const authRouter = Router()

authRouter.post('/session', authenticateController.handle)
