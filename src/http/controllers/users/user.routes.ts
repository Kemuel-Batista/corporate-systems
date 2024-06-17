import { Router } from 'express'
import { RegisterController } from './register.controller'

export const userRoutes = Router()

const registerController = new RegisterController()

userRoutes.post('/', registerController.handle)
