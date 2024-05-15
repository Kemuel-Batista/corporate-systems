import { Router } from 'express'
import { authRouter } from './http/controllers/users/auth.routes'
import { departmentRoutes } from './http/controllers/departments/routes'

const router = Router()

router.use('/auth', authRouter)
router.use('/departments', departmentRoutes)

export { router }
