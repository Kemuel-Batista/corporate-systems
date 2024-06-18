import { makeListProductQuotesByProductIdUseCase } from '@/use-cases/product-quotes/factories/make-list-product-quotes'
import { Request, Response } from 'express'

export class ListProductQuotesByProductIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { productId } = request.params

    const listProductQuotesByProductIdUseCase =
      makeListProductQuotesByProductIdUseCase()

    const result = await listProductQuotesByProductIdUseCase.execute({
      productId,
    })

    if (result.isError()) {
      return response.status(400).json('Erro ao listar as cotações de produtos')
    }

    const productQuotes = result.value.productQuotes

    return response.status(200).json({
      productQuotes,
    })
  }
}
