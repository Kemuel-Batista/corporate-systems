import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeGetCostCenterDetailsUseCase } from '@/use-cases/cost-centers/factories/make-get-cost-center-details'
import { Request, Response } from 'express'

export class GetCostCenterDetailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getCostCenterDetailsUseCase = makeGetCostCenterDetailsUseCase()

    const result = await getCostCenterDetailsUseCase.execute({
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

    const costcenter = result.value.costcenter

    return response.status(200).send(costcenter)
  }
}
