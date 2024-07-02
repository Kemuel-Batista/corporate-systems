import { makeCreateSaleUseCase } from '@/use-cases/sales/factories/make-create-sale'
import { Request, Response } from 'express'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

const saleDetailsSchema = z.object({
  productId: z.string().uuid(),
  soldAmount: z.number().int().positive(),
  unitPrice: z.number().int().positive(),
  quotes: z.number().int().positive().optional(),
  dueAtEachTime: z.number().int().positive().optional(),
  isInCash: z.boolean(),
  warehouseId: z.string().uuid(),
})

const createSaleBodySchema = z.object({
  clientId: z.string().uuid(),
  invoiceNumber: z.string(),
  saleDate: z.string().transform((arg) => new Date(arg)),
  saleDetails: z.array(saleDetailsSchema),
})

export class CreateSaleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clientId, invoiceNumber, saleDate, saleDetails } =
      createSaleBodySchema.parse(request.body)

    const createSaleUseCase = makeCreateSaleUseCase()

    const result = await createSaleUseCase.execute({
      clientId,
      invoiceNumber,
      saleDate,
      createdBy: request.user.sub,
      saleDetails,
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

    return response.status(201).send()
  }
}
