import { Either, failure, success } from '@/core/either'
import { WarehousesRepository } from '@/repositories/warehouses-repository'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'
import { Warehouse } from '@prisma/client'

interface GetWarehouseDetailsUseCaseRequest {
  id: string
}

type GetWarehouseDetailsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    warehouse: Warehouse
  }
>

export class GetWarehouseDetailsUseCase {
  constructor(private warehousesRepository: WarehousesRepository) {}

  async execute({
    id,
  }: GetWarehouseDetailsUseCaseRequest): Promise<GetWarehouseDetailsUseCaseResponse> {
    const warehouse = await this.warehousesRepository.findById(id)

    if (!warehouse) {
      return failure(new ResourceNotFoundError())
    }

    return success({
      warehouse,
    })
  }
}
