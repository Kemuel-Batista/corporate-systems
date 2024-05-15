import { Either, failure, success } from '@/core/either'
import { WarehousesRepository } from '@/repositories/warehouses-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteWarehouseUseCaseRequest {
  id: string
}

type DeleteWarehouseUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteWarehouseUseCase {
  constructor(private warehousesRepository: WarehousesRepository) {}

  async execute({
    id,
  }: DeleteWarehouseUseCaseRequest): Promise<DeleteWarehouseUseCaseResponse> {
    const warehouse = await this.warehousesRepository.findById(id)

    if (!warehouse) {
      return failure(new ResourceNotFoundError())
    }

    await this.warehousesRepository.delete(id)

    return success(null)
  }
}
