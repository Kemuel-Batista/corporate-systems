import { Router } from 'express'
import { CreatePurchaseController } from './create-purchase.controller'
import { ConfirmPurchaseController } from './confirm-purchase.controller'
import { ListPurchasesController } from './list-purchases.controller'
import { financialSecurityRoutes } from '../financial-security/routes'
import { accountPayableMovementRoutes } from '../account-payable-movement/routes'

const createPurchaseController = new CreatePurchaseController()
const confirmPurchaseController = new ConfirmPurchaseController()
const listPurchasesController = new ListPurchasesController()

const purchaseRoutes = Router()

purchaseRoutes.use('/titulos', financialSecurityRoutes)
purchaseRoutes.use('/account-payable', accountPayableMovementRoutes)

purchaseRoutes.post('/', createPurchaseController.handle)
purchaseRoutes.patch('/:id', confirmPurchaseController.handle)
purchaseRoutes.get('/', listPurchasesController.handle)

export { purchaseRoutes }
