import { Router } from 'express'
import { CreateWarehouseController } from './create-warehouse.controller'
import { EditWarehouseController } from './edit-warehouse.controller'
import { DeleteWarehouseController } from './delete-warehouse.controller'
import { ListWarehouseController } from './list-warehouse.controller'
import { GetWarehouseDetailsController } from './get-warehouse-details.controller'

const createWarehouseController = new CreateWarehouseController()
const editWarehouseController = new EditWarehouseController()
const deleteWarehouseController = new DeleteWarehouseController()
const listWarehouseController = new ListWarehouseController()
const getWarehouseDetailsController = new GetWarehouseDetailsController()

const warehouseRoutes = Router()

warehouseRoutes.post('/', createWarehouseController.handle)
warehouseRoutes.put('/:id', editWarehouseController.handle)
warehouseRoutes.delete('/:id', deleteWarehouseController.handle)
warehouseRoutes.get('/', listWarehouseController.handle)
warehouseRoutes.get('/:id', getWarehouseDetailsController.handle)

export { warehouseRoutes }
