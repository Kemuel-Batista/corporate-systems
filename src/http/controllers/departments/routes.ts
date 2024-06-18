import { Router } from 'express'
import { CreateDepartmentController } from './create-department.controller'
import { EditDepartmentController } from './edit-department.controller'
import { DeleteDepartmentController } from './delete-department.controller'
import { ListDepartmentController } from './list-department.controller'
import { GetDepartmentDetailsController } from './get-department-details.controller'

const createDepartmentController = new CreateDepartmentController()
const editDepartmentController = new EditDepartmentController()
const deleteDepartmentController = new DeleteDepartmentController()
const listDepartmentController = new ListDepartmentController()
const getDepartmentDetailsController = new GetDepartmentDetailsController()

const departmentRoutes = Router()

departmentRoutes.post('/', createDepartmentController.handle)
departmentRoutes.put('/:id', editDepartmentController.handle)
departmentRoutes.delete('/:id', deleteDepartmentController.handle)
departmentRoutes.get('/', listDepartmentController.handle)
departmentRoutes.get('/:id', getDepartmentDetailsController.handle)

export { departmentRoutes }
