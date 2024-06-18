import { makeListAccountPayableMovementByFinancialSecurityIdUseCase } from '@/use-cases/account-payable-movement/factories/make-list-by-financial-security'
import { Request, Response } from 'express'

export class ListAccountPayableMovementByFinancialSecurityIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { financialSecurityId } = request.params

    const listByFinancialSecurityIdUseCase =
      makeListAccountPayableMovementByFinancialSecurityIdUseCase()

    const result = await listByFinancialSecurityIdUseCase.execute({
      financialSecurityId,
    })

    if (result.isError()) {
      return response
        .status(400)
        .json('Erro ao listar os movimentos de titulos a pagar pelo titulo')
    }

    const accountPayableMovements = result.value.accountPayableMovements

    return response.status(200).json({
      accountPayableMovements,
    })
  }
}
