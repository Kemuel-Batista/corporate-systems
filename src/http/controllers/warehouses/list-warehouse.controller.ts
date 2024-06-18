import { makeListWarehousesUseCase } from '@/use-cases/warehouses/factories/make-list-warehouse'
import { Request, Response } from 'express'

export class ListWarehouseController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listWarehouseUseCase = makeListWarehousesUseCase()

    const result = await listWarehouseUseCase.execute()

    if (result.isError()) {
      return response.status(400).json('Erro ao listar os departamentos')
    }

    const warehouses = result.value.warehouses

    return response.status(200).json({
      warehouses,
    })
  }
}
