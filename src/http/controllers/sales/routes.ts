import { Router } from 'express'
import { CreateSaleController } from './create-sale.controller'
import { ListSaleController } from './list-sale.controller'

const createSaleController = new CreateSaleController()
const listSaleController = new ListSaleController()

const saleRoutes = Router()

saleRoutes.post('/', createSaleController.handle)
saleRoutes.get('/', listSaleController.handle)

export { saleRoutes }
