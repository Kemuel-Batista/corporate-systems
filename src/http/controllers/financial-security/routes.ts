import { Router } from 'express'
import { ListFinancialSecurityByPurchaseIdController } from './list-financial-security-by-purchase-id.controller'

const listFinancialSecurityByPurchaseIdController =
  new ListFinancialSecurityByPurchaseIdController()

const financialSecurityRoutes = Router()

financialSecurityRoutes.get(
  '/by-purchase/:purchaseId',
  listFinancialSecurityByPurchaseIdController.handle,
)

export { financialSecurityRoutes }
