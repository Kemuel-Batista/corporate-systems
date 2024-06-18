import { makeListCostCentersUseCase } from '@/use-cases/cost-centers/factories/make-list-cost-center'
import { Request, Response } from 'express'

export class ListCostCenterController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listCostCentersUseCase = makeListCostCentersUseCase()

    const result = await listCostCentersUseCase.execute()

    if (result.isError()) {
      return response.status(400).json('Erro ao listar os produtos')
    }

    const costcenters = result.value.costcenters

    return response.status(200).json({
      costcenters,
    })
  }
}
