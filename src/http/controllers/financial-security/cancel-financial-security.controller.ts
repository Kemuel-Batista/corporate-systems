import { makeCancelFinancialSecurityUseCase } from '@/use-cases/financial-security/factories/make-cancel-financial-security'
import { Request, Response } from 'express'

export class CancelFinancialSecurityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const CancelFinancialSecurityUseCase = makeCancelFinancialSecurityUseCase()

    const result = await CancelFinancialSecurityUseCase.execute({
      financialSecurityId: id,
    })

    if (result.isError()) {
      return response.status(400).json('Erro ao listar as cotações de produtos')
    }
  }
}
