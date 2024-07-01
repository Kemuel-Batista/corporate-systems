import { Router } from 'express'
import { CreateAccountReceivableMovementController } from './create-account-receivable-movement.controller'
import { ListAccountReceivableMovementByFinancialSecurityIdController } from './list-by-financial-security-id.controller'

const createAccountReceivableMovementController =
  new CreateAccountReceivableMovementController()
const listAccountReceivableMovementByFinancialSecurityIdController =
  new ListAccountReceivableMovementByFinancialSecurityIdController()

const accountReceivableMovementRoutes = Router()

accountReceivableMovementRoutes.post(
  '/',
  createAccountReceivableMovementController.handle,
)
accountReceivableMovementRoutes.get(
  '/by-financial-security/:financialSecurityId',
  listAccountReceivableMovementByFinancialSecurityIdController.handle,
)

export { accountReceivableMovementRoutes }
