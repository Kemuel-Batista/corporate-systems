import { makeCreateProductMovementUseCase } from '@/use-cases/product-movement/factories/make-create-product-movement'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { Request, Response } from 'express'
import { z } from 'zod'

const createProductMovementBodySchema = z.object({
  productId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  movementType: z.number().int().positive(),
  quantity: z.number().int().positive(),
  value: z.number().int().positive(),
})

export class CreateProductMovementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { productId, warehouseId, movementType, quantity, value } =
      createProductMovementBodySchema.parse(request.body)

    const createProductMovementUseCase = makeCreateProductMovementUseCase()

    const result = await createProductMovementUseCase.execute({
      productId,
      warehouseId,
      movementType,
      quantity,
      value,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          return response.status(409).json({
            message: error.message,
          })
        default:
          return response.status(400).json({
            message: error.message,
          })
      }
    }

    return response.status(201).json(result.value)
  }
}
