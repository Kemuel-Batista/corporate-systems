import { Router } from 'express'
import { CreateDepartmentController } from './create-department.controller'
import { ensureAuthenticated } from '@/http/middleware/ensure-authenticated'

const createDepartmentController = new CreateDepartmentController()

const departmentRoutes = Router()

departmentRoutes.post(
  '/',
  ensureAuthenticated,
  createDepartmentController.handle,
)

export { departmentRoutes }
