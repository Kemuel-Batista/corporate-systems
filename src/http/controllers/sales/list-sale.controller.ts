import { makeListSalesUseCase } from '@/use-cases/sales/factories/make-list-sales'
import { Request, Response } from 'express'
import { z } from 'zod'

const listQueryParams = z.object({
  page: z.coerce.number().int().default(1),
  invoiceNumber: z.string().optional(),
  saleDate: z
    .string()
    .transform((arg) => new Date(arg))
    .optional(),
})

export class ListSaleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, invoiceNumber, saleDate } = listQueryParams.parse(
      request.query,
    )

    const listSaleUseCase = makeListSalesUseCase()

    const result = await listSaleUseCase.execute({
      page,
      invoiceNumber,
      saleDate,
    })

    if (result.isError()) {
      return response.status(400).json('Erro ao listar as vendas')
    }

    const sales = result.value.sales

    return response.status(200).json({
      sales,
    })
  }
}
