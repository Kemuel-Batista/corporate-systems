import { makeListProductMovementByProductIdUseCase } from '@/use-cases/product-movement/factories/make-list-product-movement-by-product-id'
import { Request, Response } from 'express'
import { z } from 'zod'

const listQueryParams = z.object({
  productId: z.string().uuid(),
})

export class ListProductMovementByProductIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { productId } = listQueryParams.parse(request.params)

    const listProductMovementByProductIdUseCase =
      makeListProductMovementByProductIdUseCase()

    const result = await listProductMovementByProductIdUseCase.execute({
      productId,
    })

    if (result.isError()) {
      return response
        .status(400)
        .json('Erro ao listar os movimentos de produto')
    }

    const productMovements = result.value.productMovement

    return response.status(200).json({
      productMovements,
    })
  }
}
