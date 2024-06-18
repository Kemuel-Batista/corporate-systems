import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeDeleteWarehouseUseCase } from '@/use-cases/warehouses/factories/make-delete-warehouse'
import { Request, Response } from 'express'

export class DeleteWarehouseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteWarehouseUseCase = makeDeleteWarehouseUseCase()

    const result = await deleteWarehouseUseCase.execute({
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
