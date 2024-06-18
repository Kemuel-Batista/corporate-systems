import { makeCreateRequisitionUseCase } from '@/use-cases/requisitions/factories/make-create-requisition'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { Request, Response } from 'express'
import { z } from 'zod'

const createRequisitionBodySchema = z.object({
  costCenterId: z.string().uuid(),
  productId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  quantity: z.number().int().positive(),
})

export class CreateRequisitionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { costCenterId, productId, warehouseId, quantity } =
      createRequisitionBodySchema.parse(request.body)

    const createRequisitionUseCase = makeCreateRequisitionUseCase()

    const result = await createRequisitionUseCase.execute({
      costCenterId,
      productId,
      warehouseId,
      quantity,
      requestedBy: request.user.sub,
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

    return response.status(201).send()
  }
}
