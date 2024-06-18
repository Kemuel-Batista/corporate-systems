import { Router } from 'express'
import { CreateProductMovementController } from './create-product-movement.controller'
import { ListProductMovementByDateController } from './list-product-movement-by-date.controller'
import { ListProductMovementByProductIdController } from './list-product-movement-by-product-id.controller'
import { ListProductMovementByWarehouseIdController } from './list-product-movement-by-warehouse-id.controller'

const createProductMovementController = new CreateProductMovementController()
const listProductMovementByDateController =
  new ListProductMovementByDateController()
const listProductMovementByProductIdController =
  new ListProductMovementByProductIdController()
const listProductMovementByWarehouseIdController =
  new ListProductMovementByWarehouseIdController()

const productMovementRoutes = Router()

productMovementRoutes.post('/', createProductMovementController.handle)
productMovementRoutes.get(
  '/by-date',
  listProductMovementByDateController.handle,
)
productMovementRoutes.get(
  '/by-product/:productId',
  listProductMovementByProductIdController.handle,
)
productMovementRoutes.get(
  '/by-warehouse/:warehouseId',
  listProductMovementByWarehouseIdController.handle,
)

export { productMovementRoutes }
