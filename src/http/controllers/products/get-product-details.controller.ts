import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeGetProductDetailsUseCase } from '@/use-cases/products/factories/make-get-product-details'
import { Request, Response } from 'express'

export class GetProductDetailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getProductDetailsUseCase = makeGetProductDetailsUseCase()

    const result = await getProductDetailsUseCase.execute({
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

    const product = result.value.product

    return response.status(200).send(product)
  }
}
