import { Router } from 'express'
import { ListFinancialSecurityByPurchaseIdController } from './list-financial-security-by-purchase-id.controller'
import { CancelFinancialSecurityController } from './cancel-financial-security.controller'
import { ListFinancialSecurityBySaleIdController } from './list-financial-security-by-sale-id.controller'

const listFinancialSecurityByPurchaseIdController =
  new ListFinancialSecurityByPurchaseIdController()
const listFinancialSecurityBySaleIdController =
  new ListFinancialSecurityBySaleIdController()
const cancelFinancialSecurityController =
  new CancelFinancialSecurityController()

const financialSecurityRoutes = Router()

financialSecurityRoutes.get(
  '/by-purchase/:purchaseId',
  listFinancialSecurityByPurchaseIdController.handle,
)

financialSecurityRoutes.get(
  '/by-sale/:saleId',
  listFinancialSecurityBySaleIdController.handle,
)

financialSecurityRoutes.get(
  '/cancel/:id',
  cancelFinancialSecurityController.handle,
)

export { financialSecurityRoutes }
