import { Request, Response } from 'express'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeCreateAccountPayableMovementUseCase } from '@/use-cases/account-payable-movement/factories/make-create-account-payable-movement'

const createAccountPayableMovementBodySchema = z.object({
  financialSecurityId: z.string().uuid(),
  movementDate: z.string().transform((arg) => new Date(arg)),
  movementType: z.number().int().positive(),
  movementValue: z.number().int().positive(),
})

export class CreateAccountPayableMovementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { financialSecurityId, movementDate, movementType, movementValue } =
      createAccountPayableMovementBodySchema.parse(request.body)

    const createAccountPayableMovementUseCase =
      makeCreateAccountPayableMovementUseCase()

    const result = await createAccountPayableMovementUseCase.execute({
      financialSecurityId,
      movementDate,
      movementType,
      movementValue,
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

    return response.status(201).send()
  }
}
