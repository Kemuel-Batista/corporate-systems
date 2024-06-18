import { makeListRequisitionsUseCase } from '@/use-cases/requisitions/factories/make-list-requisitions'
import { Request, Response } from 'express'

export class ListRequisitionsController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listRequisitionUseCase = makeListRequisitionsUseCase()

    const result = await listRequisitionUseCase.execute()

    if (result.isError()) {
      return response.status(400).json('Erro ao listar os produtos')
    }

    const requisitions = result.value.requisitions

    return response.status(200).json({
      requisitions,
    })
  }
}
