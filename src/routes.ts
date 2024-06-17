import { Router } from 'express'
import { authRouter } from './http/controllers/users/auth.routes'
import { departmentRoutes } from './http/controllers/departments/routes'
import { userRoutes } from './http/controllers/users/user.routes'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRoutes)
router.use('/departments', departmentRoutes)

export { router }
