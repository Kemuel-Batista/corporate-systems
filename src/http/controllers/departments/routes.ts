import { Router } from 'express'
import { CreateDepartmentController } from './create-department.controller'

const createDepartmentController = new CreateDepartmentController()

const departmentRoutes = Router()

departmentRoutes.post('/', createDepartmentController.handle)

export { departmentRoutes }
