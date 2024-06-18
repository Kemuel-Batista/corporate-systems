import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeDeleteProductUseCase } from '@/use-cases/products/factories/make-delete-product'
import { Request, Response } from 'express'

export class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteProductUseCase = makeDeleteProductUseCase()

    const result = await deleteProductUseCase.execute({
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
