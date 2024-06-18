import { makeCancelRequisitionUseCase } from '@/use-cases/requisitions/factories/make-cancel-requisition'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { Request, Response } from 'express'
import { z } from 'zod'

const cancelRequisitionBodySchema = z.object({
  id: z.string().uuid(),
})

export class CancelRequisitionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = cancelRequisitionBodySchema.parse(request.params)

    const cancelRequisitionUseCase = makeCancelRequisitionUseCase()

    const result = await cancelRequisitionUseCase.execute({
      id,
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

    return response.status(204).send()
  }
}
