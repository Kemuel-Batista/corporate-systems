import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeDeleteCostCenterUseCase } from '@/use-cases/cost-centers/factories/make-delete-cost-center'
import { Request, Response } from 'express'

export class DeleteCostCenterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteCostCenterUseCase = makeDeleteCostCenterUseCase()

    const result = await deleteCostCenterUseCase.execute({
      id,
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
