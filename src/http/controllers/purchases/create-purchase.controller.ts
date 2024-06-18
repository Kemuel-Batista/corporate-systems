import { makeCreatePurchaseUseCase } from '@/use-cases/purchases/factories/make-create-purchase'
import { Request, Response } from 'express'
import { z } from 'zod'
import { MinimumNumberOfQuotesIsNotEnoughError } from '@/core/errors/minimum-number-of-quotes-is-not-enough-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

const createPurchaseBodySchema = z.object({
  supplierId: z.string().uuid(),
  productId: z.string().uuid(),
  productQuoteId: z.string().uuid(),
  quantity: z.number().int().positive(),
  unitCost: z.number().int().positive(),
  quotes: z.number().int().positive(),
  invoiceNumber: z.string(),
  dueAtEachTime: z.number().int().positive(),
})

export class CreatePurchaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      supplierId,
      productId,
      productQuoteId,
      quantity,
      unitCost,
      quotes,
      invoiceNumber,
      dueAtEachTime,
    } = createPurchaseBodySchema.parse(request.body)

    const createPurchaseUseCase = makeCreatePurchaseUseCase()

    const result = await createPurchaseUseCase.execute({
      supplierId,
      productId,
      productQuoteId,
      buyerId: request.user.sub,
      quantity,
      unitCost,
      quotes,
      invoiceNumber,
      dueAtEachTime,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case MinimumNumberOfQuotesIsNotEnoughError:
          return response.status(409).json({
            message: error.message,
          })
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

    return response.status(201).send()
  }
}
