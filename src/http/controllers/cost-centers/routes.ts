import { Router } from 'express'
import { CreateCostCenterController } from './create-cost-center.controller'
import { EditCostCenterController } from './edit-cost-center.controller'
import { DeleteCostCenterController } from './delete-cost-center.controller'
import { ListCostCenterController } from './list-cost-center.controller'
import { GetCostCenterDetailsController } from './get-cost-center-details.controller'

const createCostCenterController = new CreateCostCenterController()
const editCostCenterController = new EditCostCenterController()
const deleteCostCenterController = new DeleteCostCenterController()
const listCostCenterController = new ListCostCenterController()
const getCostCenterDetailsController = new GetCostCenterDetailsController()

const costCenterRoutes = Router()

costCenterRoutes.post('/', createCostCenterController.handle)
costCenterRoutes.put('/:id', editCostCenterController.handle)
costCenterRoutes.delete('/:id', deleteCostCenterController.handle)
costCenterRoutes.get('/', listCostCenterController.handle)
costCenterRoutes.get('/:id', getCostCenterDetailsController.handle)

export { costCenterRoutes }
