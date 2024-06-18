import { makeCreateProductQuoteUseCase } from '@/use-cases/product-quotes/factories/make-create-product-quote'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { Request, Response } from 'express'
import { z } from 'zod'

const createProductQuoteBodySchema = z.object({
  productId: z.string().uuid(),
  supplierId: z.string().uuid(),
  price: z.number().int().positive(),
  quoteDate: z.string().transform((arg) => new Date(arg)),
  expirationDate: z.string().transform((arg) => new Date(arg)),
})

export class CreateProductQuoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { productId, supplierId, price, quoteDate, expirationDate } =
      createProductQuoteBodySchema.parse(request.body)

    const createProductQuoteUseCase = makeCreateProductQuoteUseCase()

    const result = await createProductQuoteUseCase.execute({
      productId,
      supplierId,
      price,
      quoteDate,
      expirationDate,
      buyerId: request.user.sub,
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
