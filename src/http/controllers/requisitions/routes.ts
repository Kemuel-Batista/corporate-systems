import { Router } from 'express'
import { CreateRequisitionController } from './create-requisition.controller'
import { CancelRequisitionController } from './cancel-requisition.controller'
import { ListRequisitionsByProductIdController } from './list-requisitions-by-product-id.controller'
import { ListRequisitionsController } from './list-requisitions.controller'

const createRequisitionController = new CreateRequisitionController()
const cancelRequisitionController = new CancelRequisitionController()
const listRequisitionsController = new ListRequisitionsController()
const listRequisitionsByProductIdController =
  new ListRequisitionsByProductIdController()

const requistionRoutes = Router()

requistionRoutes.post('/', createRequisitionController.handle)
requistionRoutes.patch('/:id', cancelRequisitionController.handle)
requistionRoutes.get('/', listRequisitionsController.handle)
requistionRoutes.get(
  '/by-product/:productId',
  listRequisitionsByProductIdController.handle,
)

export { requistionRoutes }
