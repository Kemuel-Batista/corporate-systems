import { makeCreateCostCenterUseCase } from '@/use-cases/cost-centers/factories/make-create-cost-center'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { Request, Response } from 'express'
import { z } from 'zod'

const createCostCenterBodySchema = z.object({
  name: z.string(),
  code: z.string(),
  status: z.number().int().positive().min(0).max(1),
})

export class CreateCostCenterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, code, status } = createCostCenterBodySchema.parse(
      request.body,
    )

    const createCostCenterUseCase = makeCreateCostCenterUseCase()

    const result = await createCostCenterUseCase.execute({
      name,
      code,
      status,
      createdBy: request.user.sub,
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
