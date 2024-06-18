import { makeListPurchasesUseCase } from '@/use-cases/purchases/factories/make-list-purchases'
import { Request, Response } from 'express'

export class ListPurchasesController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listPurchasesUseCase = makeListPurchasesUseCase()

    const result = await listPurchasesUseCase.execute()

    if (result.isError()) {
      return response.status(400).json('Erro ao listar as compras')
    }

    const purchases = result.value.purchases

    return response.status(200).json({
      purchases,
    })
  }
}
