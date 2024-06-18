import { Router } from 'express'
import { CreateAccountPayableMovementController } from './create-account-payable-movement.controller'
import { ListAccountPayableMovementByFinancialSecurityIdController } from './list-by-financial-security-id.controller'

const createAccountPayableMovementController =
  new CreateAccountPayableMovementController()
const listAccountPayableMovementByFinancialSecurityIdController =
  new ListAccountPayableMovementByFinancialSecurityIdController()

const accountPayableMovementRoutes = Router()

accountPayableMovementRoutes.post(
  '/',
  createAccountPayableMovementController.handle,
)
accountPayableMovementRoutes.get(
  '/by-financial-security/:financialSecurityId',
  listAccountPayableMovementByFinancialSecurityIdController.handle,
)

export { accountPayableMovementRoutes }
