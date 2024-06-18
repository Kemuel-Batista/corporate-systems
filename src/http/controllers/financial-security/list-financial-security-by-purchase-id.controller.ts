import { makeListFinancialSecurityByPurchaseIdUseCase } from '@/use-cases/financial-security/factories/make-list-financial-security-by-purchase-id'
import { Request, Response } from 'express'

export class ListFinancialSecurityByPurchaseIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { purchaseId } = request.params

    const listFinancialSecurityByPurchaseIdUseCase =
      makeListFinancialSecurityByPurchaseIdUseCase()

    const result = await listFinancialSecurityByPurchaseIdUseCase.execute({
      purchaseId,
    })

    if (result.isError()) {
      return response.status(400).json('Erro ao listar as cotações de produtos')
    }

    const financialSecurities = result.value.financialSecurities

    return response.status(200).json({
      financialSecurities,
    })
  }
}
