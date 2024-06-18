import { makeListProductsUseCase } from '@/use-cases/products/factories/make-list-product'
import { Request, Response } from 'express'

export class ListProductController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listProductUseCase = makeListProductsUseCase()

    const result = await listProductUseCase.execute()

    if (result.isError()) {
      return response.status(400).json('Erro ao listar os produtos')
    }

    const products = result.value.products

    return response.status(200).json({
      products,
    })
  }
}
