import { makeListProductMovementByWarehouseIdUseCase } from '@/use-cases/product-movement/factories/make-list-product-movement-by-warehouse-id'
import { Request, Response } from 'express'
import { z } from 'zod'

const listQueryParams = z.object({
  warehouseId: z.string().uuid(),
})

export class ListProductMovementByWarehouseIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { warehouseId } = listQueryParams.parse(request.params)

    const listProductMovementByWarehouseIdUseCase =
      makeListProductMovementByWarehouseIdUseCase()

    const result = await listProductMovementByWarehouseIdUseCase.execute({
      warehouseId,
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
