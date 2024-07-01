import { makeListAccountReceivableMovementByFinancialSecurityIdUseCase } from '@/use-cases/account-receivable-movement/factories/make-list-by-financial-security'
import { Request, Response } from 'express'

export class ListAccountReceivableMovementByFinancialSecurityIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { financialSecurityId } = request.params

    const listByFinancialSecurityIdUseCase =
      makeListAccountReceivableMovementByFinancialSecurityIdUseCase()

    const result = await listByFinancialSecurityIdUseCase.execute({
      financialSecurityId,
    })

    if (result.isError()) {
      return response
        .status(400)
        .json('Erro ao listar os movimentos de titulos a pagar pelo titulo')
    }

    const accountReceivableMovements = result.value.accountReceivableMovements

    return response.status(200).json({
      accountReceivableMovements,
    })
  }
}
