import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeDeleteSupplierUseCase } from '@/use-cases/suppliers/factories/make-delete-supplier'
import { Request, Response } from 'express'

export class DeleteSupplierController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteSupplierUseCase = makeDeleteSupplierUseCase()

    const result = await deleteSupplierUseCase.execute({
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
