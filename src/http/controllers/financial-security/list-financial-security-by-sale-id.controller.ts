import { makeListFinancialSecurityBySaleIdUseCase } from '@/use-cases/financial-security/factories/make-list-financial-security-by-sale-id'
import { Request, Response } from 'express'

export class ListFinancialSecurityBySaleIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { saleId } = request.params

    const listFinancialSecurityBySaleIdUseCase =
      makeListFinancialSecurityBySaleIdUseCase()

    const result = await listFinancialSecurityBySaleIdUseCase.execute({
      saleId,
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
