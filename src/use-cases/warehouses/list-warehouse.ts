import { Either, success } from '@/core/either'
import { WarehousesRepository } from '@/repositories/warehouses-repository'
import { Warehouse } from '@prisma/client'

type ListWarehousesUseCaseResponse = Either<
  null,
  {
    warehouses: Warehouse[]
  }
>

export class ListWarehousesUseCase {
  constructor(private warehousesRepository: WarehousesRepository) {}

  async execute(): Promise<ListWarehousesUseCaseResponse> {
    const warehouses = await this.warehousesRepository.list()

    return success({
      warehouses,
    })
  }
}
