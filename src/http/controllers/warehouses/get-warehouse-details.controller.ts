import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeGetWarehouseDetailsUseCase } from '@/use-cases/warehouses/factories/make-get-warehouse-details'
import { Request, Response } from 'express'

export class GetWarehouseDetailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getWarehouseDetailsUseCase = makeGetWarehouseDetailsUseCase()

    const result = await getWarehouseDetailsUseCase.execute({
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

    const warehouse = result.value.warehouse

    return response.status(200).send(warehouse)
  }
}
