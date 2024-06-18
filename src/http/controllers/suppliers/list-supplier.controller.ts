import { makeListSuppliersUseCase } from '@/use-cases/suppliers/factories/make-list-supplier'
import { Request, Response } from 'express'

export class ListSupplierController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listSupplierUseCase = makeListSuppliersUseCase()

    const result = await listSupplierUseCase.execute()

    if (result.isError()) {
      return response.status(400).json('Erro ao listar os fornecedores')
    }

    const suppliers = result.value.suppliers

    return response.status(200).json({
      suppliers,
    })
  }
}
