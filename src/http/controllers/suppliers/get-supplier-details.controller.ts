import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeGetSupplierDetailsUseCase } from '@/use-cases/suppliers/factories/make-get-supplier-details'
import { Request, Response } from 'express'

export class GetSupplierDetailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getSupplierDetailsUseCase = makeGetSupplierDetailsUseCase()

    const result = await getSupplierDetailsUseCase.execute({
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

    const supplier = result.value.supplier

    return response.status(200).send(supplier)
  }
}
