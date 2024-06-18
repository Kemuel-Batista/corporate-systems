import { makeListProductMovementByDateUseCase } from '@/use-cases/product-movement/factories/make-list-product-movement-by-date'
import { Request, Response } from 'express'
import { z } from 'zod'

const listQueryParams = z.object({
  initialDate: z.string().transform((arg) => new Date(arg)),
  finalDate: z.string().transform((arg) => new Date(arg)),
})

export class ListProductMovementByDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { initialDate, finalDate } = listQueryParams.parse(request.query)

    const listProductMovementByDateUseCase =
      makeListProductMovementByDateUseCase()

    const result = await listProductMovementByDateUseCase.execute({
      initialDate,
      finalDate,
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
