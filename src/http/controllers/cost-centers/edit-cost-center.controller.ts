import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { makeEditCostCenterUseCase } from '@/use-cases/cost-centers/factories/make-edit-cost-center'
import { Request, Response } from 'express'
import { z } from 'zod'

const editCostCenterBodySchema = z.object({
  name: z.string(),
  code: z.string(),
  status: z.number().int().positive().min(0).max(1),
})

export class EditCostCenterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, code, status } = editCostCenterBodySchema.parse(request.body)

    const editCostCenterUseCase = makeEditCostCenterUseCase()

    const result = await editCostCenterUseCase.execute({
      id,
      name,
      code,
      status,
      updatedBy: request.user.sub,
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
