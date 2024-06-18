import { makeListRequisitionsByProductIdUseCase } from '@/use-cases/requisitions/factories/make-list-requisitions-by-product-id'
import { Request, Response } from 'express'
import { z } from 'zod'

const listQueryParams = z.object({
  productId: z.string().uuid(),
})

export class ListRequisitionsByProductIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { productId } = listQueryParams.parse(request.params)

    const listRequisitionsByProductIdUseCase =
      makeListRequisitionsByProductIdUseCase()

    const result = await listRequisitionsByProductIdUseCase.execute({
      productId,
    })

    if (result.isError()) {
      return response
        .status(400)
        .json('Erro ao listar os movimentos de produto')
    }

    const requisitions = result.value.requisitions

    return response.status(200).json({
      requisitions,
    })
  }
}
