import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeConfirmPurchaseUseCase } from '@/use-cases/purchases/factories/make-confirm-purchase'
import { Request, Response } from 'express'
import { z } from 'zod'

const confirmPurchaseBodySchema = z.object({
  warehouseId: z.string().uuid(),
})

export class ConfirmPurchaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { warehouseId } = confirmPurchaseBodySchema.parse(request.body)

    const confirmPurchaseUseCase = makeConfirmPurchaseUseCase()

    const result = await confirmPurchaseUseCase.execute({
      id,
      warehouseId,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          return response.status(404).json({
            message: error.message,
          })
        default:
          return response.status(400).json({
            message: error.message,
          })
      }
    }

    return response.status(204).send()
  }
}
