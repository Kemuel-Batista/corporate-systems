import { Router } from 'express'
import { RegisterController } from './register.controller'

const userRoutes = Router()

const registerController = new RegisterController()

userRoutes.post('/', registerController.handle)

export { userRoutes }
